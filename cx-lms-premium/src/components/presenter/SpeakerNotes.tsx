import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Clock } from 'lucide-react';
import type { LessonSection } from '../../content/types';
import { cn } from '../../lib/utils';

interface SpeakerNotesProps {
  section: LessonSection;
  journalContent?: string;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const SpeakerNotes: React.FC<SpeakerNotesProps> = ({
  section,
  journalContent,
  isVisible,
  onClose,
  className
}) => {
  const getTalkingPoints = (section: LessonSection): string[] => {
    switch (section.kind) {
      case 'text':
        return [
          'Introduce the main concept',
          'Explain key terminology',
          'Provide real-world examples',
          'Connect to previous learning'
        ];

      case 'pillars':
        return [
          'Introduce each pillar individually',
          'Explain how they work together',
          'Provide examples for each pillar',
          'Discuss practical applications'
        ];

      case 'stats':
        return [
          'Present statistics with context',
          'Explain what the numbers mean',
          'Discuss implications for CX',
          'Connect to business outcomes'
        ];

      case 'list':
        return [
          'Go through each item systematically',
          'Explain the importance of each point',
          'Provide examples or case studies',
          'Summarize key takeaways'
        ];

      case 'matrix':
        return [
          'Explain the matrix structure',
          'Walk through each quadrant',
          'Provide examples for each section',
          'Discuss how to use the framework'
        ];

      case 'formula':
        return [
          'Explain each step in detail',
          'Provide examples of application',
          'Discuss common mistakes',
          'Practice with the audience'
        ];

      default:
        return [
          'Introduce the topic',
          'Explain key concepts',
          'Provide examples',
          'Summarize main points'
        ];
    }
  };

  const talkingPoints = getTalkingPoints(section);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed right-0 top-0 bottom-0 w-96 z-40',
            'bg-black/90 backdrop-blur-md border-l border-white/20',
            className
          )}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileText size={24} />
                  Speaker Notes
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="text-white/80">
                <div className="font-semibold">{section.title}</div>
                <div className="text-sm opacity-60">{section.kind.toUpperCase()}</div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Talking Points */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock size={18} />
                  Talking Points
                </h4>
                <ul className="space-y-2">
                  {talkingPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-white/90 text-sm">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Section Content */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Content Summary</h4>
                <div className="p-4 rounded-lg bg-white/5">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {section.body || 'This section contains interactive content. Use the talking points above to guide your presentation.'}
                  </p>
                </div>
              </div>

              {/* Journal Notes */}
              {journalContent && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Your Notes</h4>
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-yellow-200 text-sm leading-relaxed">
                      {journalContent}
                    </p>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="text-blue-300 font-semibold mb-2">Presentation Tips</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Maintain eye contact with audience</li>
                  <li>• Use gestures to emphasize points</li>
                  <li>• Pause for questions between sections</li>
                  <li>• Connect concepts to real examples</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/20">
              <div className="text-white/60 text-xs text-center">
                Press <kbd className="px-2 py-1 bg-white/10 rounded">N</kbd> to toggle notes
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpeakerNotes;
