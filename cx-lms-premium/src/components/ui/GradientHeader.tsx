import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  gradient: string;
  icon?: string;
  progress?: number;
  className?: string;
}

const GradientHeader: React.FC<GradientHeaderProps> = ({
  title,
  subtitle,
  gradient,
  icon,
  progress,
  className
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl p-8 text-white",
        gradient,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="ambient-grid w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center space-x-4 mb-4">
          {icon && (
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {icon}
            </motion.div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {subtitle && (
              <p className="text-lg opacity-90">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        {progress !== undefined && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </motion.div>
  );
};

export default GradientHeader;
