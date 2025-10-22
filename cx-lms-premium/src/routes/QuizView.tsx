import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Award } from 'lucide-react';
import { useLMSStore } from '../store/useLmsStore';
import { getQuestionsByModule, getRandomQuestions } from '../content/quizQuestions';
import QuizEngine from '../components/lms/QuizEngine';
import QuizResults from '../components/lms/QuizResults';
import GlassCard from '../components/ui/GlassCard';
import GradientHeader from '../components/ui/GradientHeader';
import type { Answer } from '../content/types';

type QuizState = 'entry' | 'quiz' | 'results' | 'review';

const QuizView: React.FC = () => {
  const { modules, currentModuleId, startQuiz, submitQuiz } = useLMSStore();
  const [quizState, setQuizState] = useState<QuizState>('entry');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(currentModuleId);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Answer[]>([]);
  const [quizTimeSpent, setQuizTimeSpent] = useState(0);

  const selectedModule = modules?.find(m => m.id === selectedModuleId);

  const handleStartQuiz = () => {
    if (!selectedModuleId) return;
    
    const questions = getRandomQuestions(parseInt(selectedModuleId.split('-')[1]), 10);
    setQuizQuestions(questions);
    startQuiz(selectedModuleId, questions);
    setQuizState('quiz');
  };

  const handleQuizComplete = (answers: Answer[], timeSpent: number) => {
    setQuizAnswers(answers);
    setQuizTimeSpent(timeSpent);
    submitQuiz(answers, timeSpent);
    setQuizState('results');
  };

  const handleRetry = () => {
    setQuizAnswers([]);
    setQuizTimeSpent(0);
    setQuizState('entry');
  };

  const handleReview = () => {
    setQuizState('review');
  };

  if (quizState === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 p-4">
        <QuizEngine
          questions={quizQuestions}
          onComplete={handleQuizComplete}
          timeLimit={30} // 30 minutes
        />
      </div>
    );
  }

  if (quizState === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 p-4">
        <QuizResults
          questions={quizQuestions}
          answers={quizAnswers}
          timeSpent={quizTimeSpent}
          onRetry={handleRetry}
          onReview={handleReview}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950">
      <GradientHeader
        title="Certification Quiz"
        subtitle="Test your knowledge and earn your certification"
        gradient="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Selection */}
          <GlassCard className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Brain size={28} />
              Select Module for Quiz
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules?.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setSelectedModuleId(module.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedModuleId === module.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-lg mb-3 bg-gradient-to-r ${module.color}`}>
                    <h3 className="text-lg font-bold text-white">{module.title}</h3>
                    <p className="text-sm text-white/80">{module.subtitle}</p>
                  </div>
                  <div className="text-sm text-white/60">
                    {getQuestionsByModule(parseInt(module.id.split('-')[1])).length} questions available
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Quiz Instructions */}
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quiz Instructions
                </h3>
                
                <div className="space-y-4 text-white/80">
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-1 text-blue-400" />
                    <div>
                      <strong>Time Limit:</strong> 30 minutes
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Brain size={20} className="mt-1 text-purple-400" />
                    <div>
                      <strong>Questions:</strong> 10 randomly selected questions from {selectedModule.title}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Award size={20} className="mt-1 text-yellow-400" />
                    <div>
                      <strong>Certification Levels:</strong>
                      <ul className="ml-4 mt-2 space-y-1">
                        <li>• Master (95-100%): Expert level certification</li>
                        <li>• Expert (85-94%): Advanced level certification</li>
                        <li>• Professional (75-84%): Competent level certification</li>
                        <li>• Learning (Below 75%): Continue learning</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-blue-300 mb-2">Confidence Slider</h4>
                    <p className="text-sm">
                      For each question, indicate your confidence level. This helps us provide 
                      personalized feedback and doesn't affect your score.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleStartQuiz}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors font-medium"
                  >
                    <Brain size={20} />
                    Start Quiz
                  </button>
                  
                  <button
                    onClick={() => setSelectedModuleId(null)}
                    className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Change Module
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Review Mode Placeholder */}
          {quizState === 'review' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quiz Review
                </h3>
                <p className="text-white/80 mb-6">
                  Review mode will show detailed explanations for each question.
                </p>
                <button
                  onClick={() => setQuizState('results')}
                  className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Back to Results
                </button>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
