import { useHotkeys } from 'react-hotkeys-hook';
import { useLMSStore } from '../store/useLmsStore';

export const useKeyboardNavigation = () => {
  const {
    toggleJournal,
    togglePresenterMode,
    toggleSidebar
  } = useLMSStore();

  // Navigation shortcuts
  useHotkeys('left', () => {
    // Previous section logic
    console.log('Previous section');
  }, { preventDefault: true });

  useHotkeys('right', () => {
    // Next section logic
    console.log('Next section');
  }, { preventDefault: true });

  useHotkeys('shift+left', () => {
    // Previous lesson logic
    console.log('Previous lesson');
  }, { preventDefault: true });

  useHotkeys('shift+right', () => {
    // Next lesson logic
    console.log('Next lesson');
  }, { preventDefault: true });

  // Feature toggles
  useHotkeys('j', () => {
    toggleJournal();
  }, { preventDefault: true });

  useHotkeys('p', () => {
    togglePresenterMode();
  }, { preventDefault: true });

  useHotkeys('g', () => {
    // Navigate to module grid
    console.log('Go to module grid');
  }, { preventDefault: true });

  useHotkeys('b', () => {
    toggleSidebar();
  }, { preventDefault: true });

  // Escape key
  useHotkeys('escape', () => {
    // Close modals, exit presenter mode, etc.
    console.log('Escape pressed');
  });
};

export const keyboardShortcuts = {
  navigation: {
    '←': 'Previous section',
    '→': 'Next section',
    'Shift + ←': 'Previous lesson',
    'Shift + →': 'Next lesson'
  },
  features: {
    'J': 'Toggle journal',
    'P': 'Toggle presenter mode',
    'G': 'Go to module grid',
    'B': 'Toggle sidebar',
    'Esc': 'Close modals'
  }
};
