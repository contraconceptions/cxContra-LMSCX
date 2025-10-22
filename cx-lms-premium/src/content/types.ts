export type LessonSection = {
  id: string;
  title: string;
  kind: 'text' | 'pillars' | 'stats' | 'list' | 'exercise' | 'triggers' | 'emotions' | 'sequence' | 'technique' | 'levels' | 'crm-sections' | 'comparison' | 'channels' | 'matrix' | 'formula' | 'protocol' | 'techniques' | 'search-tips' | 'partnership' | 'regulations' | 'framework-steps' | 'scorecard' | 'shortcuts' | 'communication-guide' | 'metrics';
  body?: string;
  items?: any[];
  quadrants?: any[];
  metrics?: any[];
  steps?: any[];
  videoUrl?: string;
  audioUrl?: string;
};

export type QuizQuestion = {
  id: number;
  module: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  difficulty: 'Foundational' | 'Applied' | 'Strategic';
};

export type Quiz = {
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
};

export type Lesson = {
  id: string;
  title: string;
  tagline?: string;
  icon: string;
  color: string;
  durationMin?: number;
  sections: LessonSection[];
  quiz?: Quiz;
  videoUrl?: string;
  audioUrl?: string;
};

export type Module = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  lessons: Lesson[];
  videoUrl?: string;
  audioUrl?: string;
};

export type Answer = {
  questionId: number;
  answer: string;
  confidence: 'Low' | 'Medium' | 'High';
  timeSpent: number; // in seconds
};

export type QuizResponse = {
  answers: Answer[];
  completedAt: Date;
  score: number;
  confidenceAdjustedScore: number;
};

export type JournalEntry = {
  lessonId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Settings = {
  soundOn: boolean;
  reduceMotion: boolean;
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
};

export type Certificate = {
  id: string;
  studentName: string;
  moduleTitle: string;
  completionDate: string;
  verificationCode: string;
  score?: number;
  generatedAt: number;
};

export type AnalyticsEvent = {
  id: string;
  eventType: 'lessonStarted' | 'lessonCompleted' | 'sectionViewed' | 'quizAttempted' | 'quizCompleted';
  moduleId?: string;
  lessonId?: string;
  sectionId?: string;
  timestamp: number;
  duration?: number;
  metadata?: Record<string, any>;
};

export type OfflineModule = {
  moduleId: string;
  downloadedAt: number;
  size: number;
  version: string;
};

export type Progress = {
  completedLessons: string[];
  quizResponses: Record<string, QuizResponse>;
  journal: Record<string, JournalEntry>;
  settings: Settings;
};
