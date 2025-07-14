import React from 'react';

interface RiskScoreProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const RiskScore: React.FC<RiskScoreProps> = ({ score, showLabel = false, size = 'md' }) => {
  const getRiskLevel = () => {
    if (score >= 80) return { level: 'High', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
    if (score >= 60) return { level: 'Medium', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { level: 'Low', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-10 h-5 text-xs';
      case 'lg':
        return 'w-16 h-8 text-sm';
      default:
        return 'w-12 h-6 text-xs';
    }
  };

  const risk = getRiskLevel();

  return (
    <div className="flex items-center space-x-2">
      <div className={`${getSizeClasses()} ${risk.bg} ${risk.border} border rounded flex items-center justify-center`}>
        <span className={`font-semibold ${risk.color}`}>{score}</span>
      </div>
      {showLabel && (
        <span className={`text-sm font-medium ${risk.color}`}>{risk.level}</span>
      )}
    </div>
  );
};

export default RiskScore;