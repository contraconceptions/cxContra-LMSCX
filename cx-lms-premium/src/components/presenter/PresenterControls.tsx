import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  HelpCircle,
  X,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PresenterControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  className?: string;
}

const PresenterControls: React.FC<PresenterControlsProps> = ({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onExit,
  onToggleTheme,
  isDarkMode,
  className
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Show controls on mouse movement
  const handleMouseMove = () => {
    setIsVisible(true);
  };

  // Timer for auto-advance
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev >= 30) { // 30 seconds per slide
          onNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, onNext]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const keyboardShortcuts = [
    { key: '← / →', action: 'Previous / Next slide' },
    { key: 'Space', action: 'Next slide' },
    { key: 'Home', action: 'First slide' },
    { key: 'End', action: 'Last slide' },
    { key: 'T', action: 'Toggle theme' },
    { key: 'P', action: 'Play / Pause auto-advance' },
    { key: 'Esc', action: 'Exit presenter mode' },
    { key: '?', action: 'Show / Hide help' }
  ];

  return (
    <>
      {/* Main Controls */}
      <motion.div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'bg-black/80 backdrop-blur-md border-t border-white/20',
          className
        )}
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Left Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              disabled={currentSlide === 1}
              className={cn(
                'p-2 rounded-lg transition-colors',
                currentSlide === 1
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white hover:bg-white/20'
              )}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={onNext}
              disabled={currentSlide === totalSlides}
              className={cn(
                'p-2 rounded-lg transition-colors',
                currentSlide === totalSlides
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white hover:bg-white/20'
              )}
            >
              <ChevronRight size={24} />
            </button>

            <div className="text-white/80 text-sm">
              {currentSlide} / {totalSlides}
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={cn(
                'p-2 rounded-lg transition-colors',
                isPlaying ? 'text-green-400 bg-green-400/20' : 'text-white hover:bg-white/20'
              )}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {isPlaying && (
              <div className="text-white/80 text-sm font-mono">
                {formatTime(timer)}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={() => setShowHelp(true)}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <HelpCircle size={20} />
            </button>

            <button
              onClick={onExit}
              className="p-2 rounded-lg text-white hover:bg-red-500/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <div className="text-white/80">{shortcut.action}</div>
                    <div className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                      {shortcut.key}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <p className="text-blue-300 text-sm">
                  💡 Tip: Move your mouse to show/hide controls. Auto-advance plays slides for 30 seconds each.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PresenterControls;
