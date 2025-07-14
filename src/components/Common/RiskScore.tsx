import React from 'react';

interface RiskScoreProps {
  score: number;
  showLabel?: boolean;
}

const RiskScore: React.FC<RiskScoreProps> = ({ score, showLabel = false }) => {
  const getRiskLevel = () => {
    if (score >= 80) return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    if (score >= 60) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const risk = getRiskLevel();

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-12 h-6 ${risk.bg} rounded-full flex items-center justify-center`}>
        <span className={`text-xs font-semibold ${risk.color}`}>{score}</span>
      </div>
      {showLabel && (
        <span className={`text-sm font-medium ${risk.color}`}>{risk.level}</span>
      )}
    </div>
  );
};

export default RiskScore;