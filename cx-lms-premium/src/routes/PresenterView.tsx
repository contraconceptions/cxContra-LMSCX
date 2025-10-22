import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLMSStore, useCurrentModule, useCurrentLesson } from '../store/useLmsStore';
import PresenterSlide from '../components/presenter/PresenterSlide';
import PresenterControls from '../components/presenter/PresenterControls';
import SpeakerNotes from '../components/presenter/SpeakerNotes';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const PresenterView: React.FC = () => {
  const navigate = useNavigate();
  const { journal } = useLMSStore();
  const currentModule = useCurrentModule();
  const currentLesson = useCurrentLesson();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [isLaserPointer, setIsLaserPointer] = useState(false);

  // Get all sections from current lesson
  const sections = currentLesson?.sections || [];
  const currentSection = sections[currentSlideIndex];
  const journalContent = currentLesson ? journal[currentLesson.id]?.content : undefined;

  // Keyboard shortcuts
  useHotkeys('left', () => handlePrevious(), { preventDefault: true });
  useHotkeys('right', () => handleNext(), { preventDefault: true });
  useHotkeys('space', () => handleNext(), { preventDefault: true });
  useHotkeys('home', () => setCurrentSlideIndex(0), { preventDefault: true });
  useHotkeys('end', () => setCurrentSlideIndex(sections.length - 1), { preventDefault: true });
  useHotkeys('t', () => setIsDarkMode(!isDarkMode), { preventDefault: true });
  useHotkeys('n', () => setShowNotes(!showNotes), { preventDefault: true });
  useHotkeys('l', () => setIsLaserPointer(!isLaserPointer), { preventDefault: true });
  useHotkeys('escape', () => navigate('/modules'), { preventDefault: true });

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < sections.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handleExit = () => {
    navigate('/modules');
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show message if no lesson is selected
  if (!currentLesson || sections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">No Lesson Selected</h1>
          <p className="text-white/60 mb-8">
            Please select a lesson from the modules to enter presenter mode.
          </p>
          <button
            onClick={() => navigate('/modules')}
            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            Go to Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen relative overflow-hidden',
      isLaserPointer && 'cursor-none'
    )}>
      {/* Laser Pointer Effect */}
      {isLaserPointer && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse" />
        </div>
      )}

      {/* Main Slide */}
      <AnimatePresence mode="wait">
        {currentSection && (
          <PresenterSlide
            key={currentSlideIndex}
            section={currentSection}
            slideNumber={currentSlideIndex + 1}
            totalSlides={sections.length}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* Controls */}
      <PresenterControls
        currentSlide={currentSlideIndex + 1}
        totalSlides={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onExit={handleExit}
        onToggleTheme={handleToggleTheme}
        isDarkMode={isDarkMode}
      />

      {/* Speaker Notes */}
      {currentSection && (
        <SpeakerNotes
          section={currentSection}
          journalContent={journalContent}
          isVisible={showNotes}
          onClose={() => setShowNotes(false)}
        />
      )}

      {/* Lesson Info Overlay */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 text-white">
          <div className="text-sm opacity-60">Current Lesson</div>
          <div className="font-semibold">{currentLesson.title}</div>
          <div className="text-xs opacity-60">{currentModule?.title}</div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed top-4 right-4 z-30">
        <div className="bg-black/80 backdrop-blur-md rounded-lg p-4 text-white text-sm">
          <div className="opacity-60 mb-2">Shortcuts</div>
          <div className="space-y-1 text-xs">
            <div>← → Navigate</div>
            <div>T Theme</div>
            <div>N Notes</div>
            <div>L Laser</div>
            <div>Esc Exit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresenterView;
