import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Module, QuizResponse, JournalEntry, Settings, Answer, Certificate } from '../content/types';

interface LMSState {
  // Current navigation
  currentModuleId: string | null;
  currentLessonId: string | null;
  currentSectionId: string | null;
  
  // Progress tracking
  completedLessons: string[];
  quizResponses: Record<string, QuizResponse>;
  journal: Record<string, JournalEntry>;
  certificates: Certificate[];
  
  // Quiz state
  currentQuiz: {
    moduleId: string;
    questions: any[];
    startTime: number;
  } | null;
  
  // Settings
  settings: Settings;
  
  // UI state
  sidebarOpen: boolean;
  journalOpen: boolean;
  presenterMode: boolean;
  
  // Data
  modules?: Module[];
  
  // Actions
  setCurrentModule: (moduleId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentSection: (sectionId: string) => void;
  completeLesson: (lessonId: string) => void;
  saveQuizResponse: (lessonId: string, response: QuizResponse) => void;
  saveJournalEntry: (lessonId: string, content: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  toggleSidebar: () => void;
  toggleJournal: () => void;
  togglePresenterMode: () => void;
  resetProgress: () => void;
  
  // Quiz actions
  startQuiz: (moduleId: string, questions: any[]) => void;
  submitQuiz: (answers: Answer[], timeSpent: number) => void;
  
  // Certificate actions
  saveCertificate: (certificate: Certificate) => void;
}

const defaultSettings: Settings = {
  soundOn: true,
  reduceMotion: false,
  theme: 'dark',
  fontSize: 'base'
};

export const useLMSStore = create<LMSState>()(
  persist(
    (set) => ({
      // Initial state
      currentModuleId: null,
      currentLessonId: null,
      currentSectionId: null,
      completedLessons: [],
      quizResponses: {},
      journal: {},
      certificates: [],
      currentQuiz: null,
      settings: defaultSettings,
      sidebarOpen: true,
      journalOpen: false,
      presenterMode: false,

      // Actions
      setCurrentModule: (moduleId: string) => 
        set({ currentModuleId: moduleId }),

      setCurrentLesson: (lessonId: string) => 
        set({ currentLessonId: lessonId }),

      setCurrentSection: (sectionId: string) => 
        set({ currentSectionId: sectionId }),

      completeLesson: (lessonId: string) => 
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId]
        })),

      saveQuizResponse: (lessonId: string, response: QuizResponse) =>
        set((state) => ({
          quizResponses: {
            ...state.quizResponses,
            [lessonId]: response
          }
        })),

      saveJournalEntry: (lessonId: string, content: string) =>
        set((state) => {
          const now = new Date();
          const existingEntry = state.journal[lessonId];
          
          return {
            journal: {
              ...state.journal,
              [lessonId]: {
                lessonId,
                content,
                createdAt: existingEntry?.createdAt || now,
                updatedAt: now
              }
            }
          };
        }),

      updateSettings: (newSettings: Partial<Settings>) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      toggleJournal: () =>
        set((state) => ({ journalOpen: !state.journalOpen })),

      togglePresenterMode: () =>
        set((state) => ({ presenterMode: !state.presenterMode })),

      resetProgress: () =>
        set({
          completedLessons: [],
          quizResponses: {},
          journal: {},
          certificates: [],
          currentModuleId: null,
          currentLessonId: null,
          currentSectionId: null,
          currentQuiz: null
        }),
      
      // Quiz actions
      startQuiz: (moduleId: string, questions: any[]) =>
        set({
          currentQuiz: {
            moduleId,
            questions,
            startTime: Date.now()
          }
        }),
      
      submitQuiz: (answers: Answer[], _timeSpent: number) =>
        set((state) => {
          if (!state.currentQuiz) return state;
          
          const correctAnswers = answers.filter(answer => {
            const question = state.currentQuiz!.questions.find((q: any) => q.id === answer.questionId);
            return question && answer.answer === question.correct;
          }).length;
          
          const score = Math.round((correctAnswers / answers.length) * 100);
          
          const response: QuizResponse = {
            answers,
            completedAt: new Date(),
            score,
            confidenceAdjustedScore: score // For now, same as regular score
          };
          
          return {
            quizResponses: {
              ...state.quizResponses,
              [state.currentQuiz.moduleId]: response
            },
            currentQuiz: null
          };
        }),
      
      // Certificate actions
      saveCertificate: (certificate: Certificate) =>
        set((state) => ({
          certificates: [...state.certificates, certificate]
        }))
    }),
    {
      name: 'cx-lms-storage',
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        quizResponses: state.quizResponses,
        journal: state.journal,
        certificates: state.certificates,
        settings: state.settings
      })
    }
  )
);

// Selectors
export const useCurrentModule = () => {
  const currentModuleId = useLMSStore((state) => state.currentModuleId);
  const modules = useLMSStore((state) => state.modules || []);
  return modules.find(m => m.id === currentModuleId);
};

export const useCurrentLesson = () => {
  const currentLessonId = useLMSStore((state) => state.currentLessonId);
  const currentModule = useCurrentModule();
  return currentModule?.lessons.find(l => l.id === currentLessonId);
};

export const useProgress = () => {
  const completedLessons = useLMSStore((state) => state.completedLessons);
  const modules = useLMSStore((state) => state.modules || []);
  
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedCount = completedLessons.length;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  return {
    completedCount,
    totalLessons,
    percentage,
    completedLessons
  };
};

export const useModuleProgress = (moduleId: string) => {
  const completedLessons = useLMSStore((state) => state.completedLessons);
  const modules = useLMSStore((state) => state.modules || []);
  const module = modules.find(m => m.id === moduleId);
  
  if (!module) return { completedCount: 0, totalLessons: 0, percentage: 0 };
  
  const moduleLessonIds = module.lessons.map(l => l.id);
  const completedCount = moduleLessonIds.filter(id => completedLessons.includes(id)).length;
  const percentage = Math.round((completedCount / module.lessons.length) * 100);
  
  return {
    completedCount,
    totalLessons: module.lessons.length,
    percentage
  };
};
