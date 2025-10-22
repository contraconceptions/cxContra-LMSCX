import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Award, TrendingUp } from 'lucide-react';
import type { QuizQuestion, Answer } from '../../content/types';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';

interface QuizResultsProps {
  questions: QuizQuestion[];
  answers: Answer[];
  timeSpent: number;
  onRetry: () => void;
  onReview: () => void;
  className?: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  answers,
  timeSpent,
  onRetry,
  onReview,
  className
}) => {
  // Calculate scores
  const correctAnswers = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return question && answer.answer === question.correct;
  }).length;

  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Confidence analysis
  const confidenceBreakdown = answers.reduce((acc, answer) => {
    acc[answer.confidence] = (acc[answer.confidence] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const highConfidenceCorrect = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return answer.confidence === 'High' && question && answer.answer === question.correct;
  }).length;

  const highConfidenceWrong = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return answer.confidence === 'High' && question && answer.answer !== question.correct;
  }).length;

  // Get certification level
  const getCertificationLevel = (score: number) => {
    if (score >= 95) return { level: 'Master', color: 'text-yellow-400', icon: '🏆' };
    if (score >= 85) return { level: 'Expert', color: 'text-blue-400', icon: '🥇' };
    if (score >= 75) return { level: 'Professional', color: 'text-green-400', icon: '🥈' };
    return { level: 'Learning', color: 'text-gray-400', icon: '📚' };
  };

  const certification = getCertificationLevel(percentage);

  // Personalized feedback
  const getPersonalizedFeedback = () => {
    const feedback = [];
    
    if (highConfidenceWrong > 0) {
      feedback.push({
        type: 'warning',
        message: `You were highly confident on ${highConfidenceWrong} incorrect answers. Consider reviewing those topics more carefully.`
      });
    }
    
    if (highConfidenceCorrect > correctAnswers * 0.8) {
      feedback.push({
        type: 'success',
        message: 'Great job! You showed strong confidence in your correct answers.'
      });
    }
    
    if (confidenceBreakdown['Low'] > totalQuestions * 0.3) {
      feedback.push({
        type: 'info',
        message: 'You showed low confidence on many questions. Consider reviewing the material to build stronger understanding.'
      });
    }
    
    return feedback;
  };

  const feedback = getPersonalizedFeedback();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">{certification.icon}</div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Quiz Complete!
            </h1>
            <div className={cn('text-2xl font-semibold mb-4', certification.color)}>
              {certification.level} Level
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-white/60">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {percentage}%
              </div>
              <div className="text-white/60">Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {formatTime(timeSpent)}
              </div>
              <div className="text-white/60">Time Spent</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              <RotateCcw size={20} />
              Retry Quiz
            </button>
            <button
              onClick={onReview}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Award size={20} />
              Review Answers
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Confidence Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={24} />
            Confidence Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(confidenceBreakdown).map(([level, count]) => (
              <div key={level} className="text-center">
                <div className={cn(
                  'text-2xl font-bold mb-1',
                  level === 'Low' && 'text-yellow-400',
                  level === 'Medium' && 'text-orange-400',
                  level === 'High' && 'text-green-400'
                )}>
                  {count}
                </div>
                <div className="text-white/60">{level} Confidence</div>
              </div>
            ))}
          </div>

          {/* Confidence Insights */}
          <div className="space-y-3">
            <div className="text-sm text-white/80">
              <strong>High Confidence Correct:</strong> {highConfidenceCorrect} answers
            </div>
            <div className="text-sm text-white/80">
              <strong>High Confidence Wrong:</strong> {highConfidenceWrong} answers
            </div>
            {highConfidenceWrong > 0 && (
              <div className="text-sm text-yellow-400">
                💡 Consider reviewing topics where you were highly confident but incorrect
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* Personalized Feedback */}
      {feedback.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Personalized Insights
            </h2>
            <div className="space-y-3">
              {feedback.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-3 rounded-lg',
                    item.type === 'success' && 'bg-green-500/20 border border-green-500/30',
                    item.type === 'warning' && 'bg-yellow-500/20 border border-yellow-500/30',
                    item.type === 'info' && 'bg-blue-500/20 border border-blue-500/30'
                  )}
                >
                  <div className="text-white/90">{item.message}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Question Review Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Quick Review
          </h2>
          <div className="space-y-3">
            {questions.slice(0, 3).map((question) => {
              const answer = answers.find(a => a.questionId === question.id);
              const isCorrect = answer?.answer === question.correct;
              
              return (
                <div key={question.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center',
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  )}>
                    {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 text-sm">
                      {question.question.substring(0, 80)}...
                    </div>
                    <div className="text-xs text-white/60 mt-1">
                      Your answer: {answer?.answer || 'Not answered'}
                    </div>
                  </div>
                </div>
              );
            })}
            {questions.length > 3 && (
              <div className="text-center text-white/60 text-sm">
                ... and {questions.length - 3} more questions
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default QuizResults;
