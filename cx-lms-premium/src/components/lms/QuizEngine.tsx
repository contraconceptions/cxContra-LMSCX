import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flag, Clock, CheckCircle } from 'lucide-react';
import type { QuizQuestion, Answer } from '../../content/types';
import ConfidenceSlider from './ConfidenceSlider';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (answers: Answer[], timeSpent: number) => void;
  timeLimit?: number; // in minutes
  className?: string;
}

const QuizEngine: React.FC<QuizEngineProps> = ({
  questions,
  onComplete,
  timeLimit,
  className
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : null);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flaggedQuestions.size;

  // Timer countdown
  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev && prev <= 1) {
          // Time's up - auto submit
          handleSubmit();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswerChange = (option: string) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      answer: option,
      confidence: answers[currentQuestion.id]?.confidence || 'Medium',
      timeSpent: 0
    };
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleConfidenceChange = (confidence: 'Low' | 'Medium' | 'High') => {
    if (answers[currentQuestion.id]) {
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          confidence
        }
      }));
    }
  };

  const handleFlagToggle = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion.id)) {
      newFlagged.delete(currentQuestion.id);
    } else {
      newFlagged.add(currentQuestion.id);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Calculate total time spent
    const totalTimeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Convert answers to array format
    const answersArray = Object.values(answers);
    
    // Add time spent for each answer
    const answersWithTime = answersArray.map(answer => ({
      ...answer,
      timeSpent: totalTimeSpent / answersArray.length // Rough estimate
    }));
    
    onComplete(answersWithTime, totalTimeSpent);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white/80">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="flex items-center gap-4">
            {timeRemaining && (
              <div className="flex items-center gap-2 text-white/80">
                <Clock size={16} />
                <span className={cn(
                  'font-mono',
                  timeRemaining < 300 && 'text-red-400' // Red when less than 5 minutes
                )}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            <div className="text-white/80">
              {answeredCount}/{questions.length} answered
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <GlassCard className="p-8">
            {/* Question */}
            <div className="mb-8">
              <div className="flex items-start gap-3 mb-4">
                <h2 className="text-xl font-bold text-white flex-1">
                  {currentQuestion.question}
                </h2>
                <button
                  onClick={handleFlagToggle}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    flaggedQuestions.has(currentQuestion.id)
                      ? 'text-yellow-400 bg-yellow-400/20'
                      : 'text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10'
                  )}
                >
                  <Flag size={20} />
                </button>
              </div>
              
              <div className="text-sm text-white/60 mb-2">
                Difficulty: <span className="font-medium">{currentQuestion.difficulty}</span>
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerChange(option)}
                  className={cn(
                    'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
                    'hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500',
                    answers[currentQuestion.id]?.answer === option
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-white/20 text-white/80 hover:border-white/40'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                      answers[currentQuestion.id]?.answer === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-white/40'
                    )}>
                      {answers[currentQuestion.id]?.answer === option && (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    </div>
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Confidence Slider */}
            {answers[currentQuestion.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <ConfidenceSlider
                  value={answers[currentQuestion.id].confidence}
                  onChange={handleConfidenceChange}
                />
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                  isFirstQuestion
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white hover:bg-white/10'
                )}
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {flaggedCount > 0 && (
                  <div className="text-sm text-yellow-400">
                    {flaggedCount} flagged
                  </div>
                )}
              </div>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || answeredCount === 0}
                  className={cn(
                    'px-6 py-2 rounded-lg font-medium transition-colors',
                    isSubmitting || answeredCount === 0
                      ? 'bg-white/20 text-white/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                  )}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizEngine;
