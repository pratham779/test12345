import React from 'react';
import { AlertTriangle, Eye, CheckCircle } from 'lucide-react';

interface ActionPillProps {
  action: 'shift' | 'monitor' | 'maintain';
  size?: 'sm' | 'md';
}

const ActionPill: React.FC<ActionPillProps> = ({ action, size = 'md' }) => {
  const getActionStyles = () => {
    switch (action) {
      case 'shift':
        return {
          bg: 'bg-red-50',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: AlertTriangle
        };
      case 'monitor':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-800',
          border: 'border-amber-200',
          icon: Eye
        };
      case 'maintain':
        return {
          bg: 'bg-green-50',
          text: 'text-green-800',
          border: 'border-green-200',
          icon: CheckCircle
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: CheckCircle
        };
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'shift':
        return 'Shift Sourcing';
      case 'monitor':
        return 'Monitor';
      case 'maintain':
        return 'Maintain';
      default:
        return action;
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const styles = getActionStyles();
  const Icon = styles.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1 ${sizeClasses} font-medium rounded border ${styles.bg} ${styles.text} ${styles.border}`}
    >
      <Icon className="h-3 w-3" />
      <span>{getActionText()}</span>
    </span>
  );
};

export default ActionPill;