import React from 'react';
import { formatDecimal } from '../data/catalog';

interface StarRatingProps {
  score: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ score, className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (score / 5) * 100)).toFixed(1);
  return (
    <span
      className={`stars ${className}`}
      style={{ '--p': `${percentage}%` } as React.CSSProperties}
      role="img"
      aria-label={`${formatDecimal(score)} de 5 estrellas`}
    />
  );
};
