import React from 'react';

interface ActionPillProps {
  action: 'shift' | 'monitor' | 'maintain';
  size?: 'sm' | 'md';
}

const ActionPill: React.FC<ActionPillProps> = ({ action, size = 'md' }) => {
  const getActionStyles = () => {
    switch (action) {
      case 'shift':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'monitor':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintain':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActionIcon = () => {
    switch (action) {
      case 'shift':
        return '🔄';
      case 'monitor':
        return '👁️';
      case 'maintain':
        return '✅';
      default:
        return '⚪';
    }
  };

  const getActionText = () => {
    switch (action) {
      case 'shift':
        return 'Shift Sourcing';
      case 'monitor':
        return 'Monitor Closely';
      case 'maintain':
        return 'Maintain Current';
      default:
        return action;
    }
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex items-center space-x-1 ${sizeClasses} font-medium rounded-full border ${getActionStyles()}`}
    >
      <span>{getActionIcon()}</span>
      <span>{getActionText()}</span>
    </span>
  );
};

export default ActionPill;