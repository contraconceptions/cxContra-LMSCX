import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ConfidenceSliderProps {
  value: 'Low' | 'Medium' | 'High';
  onChange: (value: 'Low' | 'Medium' | 'High') => void;
  disabled?: boolean;
  className?: string;
}

const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({
  value,
  onChange,
  disabled = false,
  className
}) => {
  const levels = ['Low', 'Medium', 'High'] as const;
  const currentIndex = levels.indexOf(value);

  const handleClick = (level: 'Low' | 'Medium' | 'High') => {
    if (!disabled) {
      onChange(level);
    }
  };

  const getColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return 'bg-yellow-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'High':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTextColor = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return 'text-yellow-400';
      case 'Medium':
        return 'text-orange-400';
      case 'High':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="text-sm font-medium text-white/80 mb-1">
        Confidence Level
      </div>
      
      {/* Slider Track */}
      <div className="relative w-full h-8 bg-white/10 rounded-full p-1">
        {/* Active Background */}
        <motion.div
          className={cn('absolute top-1 h-6 rounded-full', getColor(value))}
          initial={{ width: 0 }}
          animate={{ 
            width: `${(currentIndex + 1) * 33.33}%`,
            transition: { duration: 0.2 }
          }}
        />
        
        {/* Level Indicators */}
        <div className="relative flex justify-between items-center h-full">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => handleClick(level)}
              disabled={disabled}
              className={cn(
                'relative z-10 w-6 h-6 rounded-full border-2 transition-all duration-200',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50',
                value === level
                  ? 'border-white bg-white shadow-lg'
                  : 'border-white/30 bg-white/20 hover:border-white/50',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {value === level && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs">
        {levels.map((level) => (
          <span
            key={level}
            className={cn(
              'font-medium transition-colors duration-200',
              value === level ? getTextColor(level) : 'text-white/50',
              disabled && 'opacity-50'
            )}
          >
            {level}
          </span>
        ))}
      </div>
      
      {/* Description */}
      <div className="text-xs text-white/60 text-center">
        {value === 'Low' && 'Not sure about this answer'}
        {value === 'Medium' && 'Somewhat confident'}
        {value === 'High' && 'Very confident in this answer'}
      </div>
    </div>
  );
};

export default ConfidenceSlider;
