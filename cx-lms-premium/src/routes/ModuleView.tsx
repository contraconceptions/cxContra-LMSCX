import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, CheckCircle, Circle } from 'lucide-react';
import { useLMSStore, useModuleProgress } from '../store/useLmsStore';
import { modules } from '../content/modules';
import { formatDuration } from '../lib/utils';
import GlassCard from '../components/ui/GlassCard';
import GradientHeader from '../components/ui/GradientHeader';

const ModuleView: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { completedLessons, setCurrentModule, setCurrentLesson } = useLMSStore();
  
  const module = moduleId 
    ? modules.find(m => m.id === moduleId)
    : modules[0]; // Default to first module
  
  const moduleProgress = useModuleProgress(module?.id || '');
  
  if (!module) {
    return (
      <div className="p-8">
        <div className="text-center text-white/60">
          Module not found
        </div>
      </div>
    );
  }

  const handleLessonClick = (lessonId: string) => {
    setCurrentModule(module.id);
    setCurrentLesson(lessonId);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Module Header */}
      <GradientHeader
        title={module.title}
        subtitle={module.subtitle}
        gradient={module.color}
        progress={moduleProgress.percentage}
      />

      {/* Video/Audio Section */}
      {(module.videoUrl || module.audioUrl) && (
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Module Overview</h3>
              <p className="text-white/80">Watch the introduction video or listen to the podcast</p>
            </div>
            <div className="flex space-x-4">
              {module.videoUrl && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Watch Video</span>
                </button>
              )}
              {module.audioUrl && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Listen</span>
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Lessons Grid */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/modules/${module.id}/lessons/${lesson.id}`}
                  onClick={() => handleLessonClick(lesson.id)}
                >
                  <GlassCard hover glow={isCompleted}>
                    <div className="space-y-4">
                      {/* Lesson Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{lesson.icon}</div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              Lesson {index + 1}
                            </h3>
                            <p className="text-sm text-white/60">
                              {lesson.title}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-white/40" />
                          )}
                        </div>
                      </div>

                      {/* Lesson Info */}
                      <div className="space-y-2">
                        <p className="text-white/80 text-sm">
                          {lesson.tagline}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-white/60">
                          {lesson.durationMin && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatDuration(lesson.durationMin)}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-1">
                            <span>{lesson.sections.length} sections</span>
                          </div>
                        </div>
                      </div>

                      {/* Media Indicators */}
                      <div className="flex space-x-2">
                        {lesson.videoUrl && (
                          <div className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                            Video
                          </div>
                        )}
                        {lesson.audioUrl && (
                          <div className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                            Audio
                          </div>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
