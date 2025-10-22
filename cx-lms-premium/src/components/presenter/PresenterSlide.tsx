import React from 'react';
import { motion } from 'framer-motion';
import type { LessonSection } from '../../content/types';
import { cn } from '../../lib/utils';

interface PresenterSlideProps {
  section: LessonSection;
  slideNumber: number;
  totalSlides: number;
  isDarkMode?: boolean;
  className?: string;
}

const PresenterSlide: React.FC<PresenterSlideProps> = ({
  section,
  slideNumber,
  totalSlides,
  isDarkMode = false,
  className
}) => {
  const renderContent = () => {
    switch (section.kind) {
      case 'text':
        return (
          <div className="prose prose-lg max-w-none">
            <p className="text-2xl leading-relaxed">{section.body}</p>
          </div>
        );

      case 'pillars':
        return (
          <div className="grid grid-cols-2 gap-8">
            {section.items?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-xl leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'stats':
        return (
          <div className="grid grid-cols-2 gap-8">
            {section.items?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-bold mb-2">{item.value}</div>
                <div className="text-2xl font-semibold mb-2">{item.label}</div>
                <div className="text-lg">{item.description}</div>
              </motion.div>
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-6">
              {section.items?.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="text-3xl mt-2">{item.icon || '•'}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-xl leading-relaxed">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        );

      case 'matrix':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              {section.quadrants?.map((quadrant, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border-2 rounded-lg"
                >
                  <h3 className="text-2xl font-bold mb-4">{quadrant.title}</h3>
                  <p className="text-lg">{quadrant.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8">{section.title}</h3>
            <div className="space-y-6">
              {section.steps?.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center justify-center gap-4"
                >
                  <div className="text-2xl font-bold bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="text-xl">{step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">{section.title}</h3>
            <p className="text-xl">{section.body}</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className={cn(
        'min-h-screen flex flex-col justify-center items-center p-12',
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Slide Header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <div className="text-lg opacity-60">
          {section.title}
        </div>
        <div className="text-lg opacity-60">
          {slideNumber} / {totalSlides}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center">
        {renderContent()}
      </div>

      {/* Slide Footer */}
      <div className="absolute bottom-8 left-8 right-8 text-center opacity-60">
        <div className="text-sm">
          CX Masterclass • {section.kind.toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
};

export default PresenterSlide;
