import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, CheckCircle } from 'lucide-react';
import { useLMSStore, useCurrentModule, useModuleProgress } from '../store/useLmsStore';
import { createCertificateData } from '../lib/certificates';
import CertificatePreview from '../components/certificates/CertificatePreview';
import GlassCard from '../components/ui/GlassCard';
import GradientHeader from '../components/ui/GradientHeader';
import type { Certificate } from '../content/types';

const CertificateView: React.FC = () => {
  const { modules, certificates, saveCertificate: saveCert } = useLMSStore();
  const currentModule = useCurrentModule();
  
  const [studentName, setStudentName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState(currentModule?.id || '');
  const [generatedCertificate, setGeneratedCertificate] = useState<Certificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedModule = modules?.find(m => m.id === selectedModuleId);
  const selectedModuleProgress = useModuleProgress(selectedModuleId);
  
  // Check if module is completed (all lessons + quiz passed)
  const isModuleCompleted = selectedModuleProgress.percentage === 100;
  
  // Get quiz score for the module
  const moduleQuizResponse = useLMSStore(state => 
    state.quizResponses[selectedModuleId]
  );
  const quizScore = moduleQuizResponse?.score;

  const handleGenerateCertificate = async () => {
    if (!studentName.trim() || !selectedModule) return;
    
    setIsGenerating(true);
    try {
      const certificate = createCertificateData(
        studentName.trim(),
        selectedModule.title,
        quizScore
      );
      
      // Save to store
      saveCert(certificate);
      
      setGeneratedCertificate(certificate);
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      alert('Failed to generate certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNewCertificate = () => {
    setGeneratedCertificate(null);
    setStudentName('');
  };

  if (generatedCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 p-4">
        <CertificatePreview 
          certificate={generatedCertificate}
          onClose={handleNewCertificate}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950">
      <GradientHeader
        title="Certificate Generation"
        subtitle="Generate your completion certificate"
        gradient="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600"
        icon="🏆"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Module Selection */}
          <GlassCard className="p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Award size={28} />
              Select Module for Certificate
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules?.map((module) => {
                const moduleProgress = useModuleProgress(module.id);
                const isCompleted = moduleProgress.percentage === 100;
                const hasQuizScore = useLMSStore(state => state.quizResponses[module.id]);
                
                return (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModuleId(module.id)}
                    disabled={!isCompleted}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedModuleId === module.id
                        ? 'border-yellow-500 bg-yellow-500/20'
                        : isCompleted
                        ? 'border-white/20 hover:border-white/40 hover:bg-white/5'
                        : 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`p-3 rounded-lg mb-3 bg-gradient-to-r ${module.color}`}>
                      <h3 className="text-lg font-bold text-white">{module.title}</h3>
                      <p className="text-sm text-white/80">{module.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-white/60">
                        {moduleProgress.completedCount}/{moduleProgress.totalLessons} lessons
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <CheckCircle size={16} className="text-green-400" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-white/40 rounded-full" />
                        )}
                      </div>
                    </div>
                    
                    {isCompleted && hasQuizScore && (
                      <div className="text-xs text-green-400 mt-2">
                        Quiz Score: {hasQuizScore.score}%
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Certificate Generation Form */}
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Generate Certificate
                </h3>
                
                {!isModuleCompleted ? (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 text-6xl mb-4">⚠️</div>
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Module Not Completed
                    </h4>
                    <p className="text-white/60 mb-4">
                      You need to complete all lessons in {selectedModule.title} to generate a certificate.
                    </p>
                    <div className="text-sm text-white/60">
                      Progress: {selectedModuleProgress.percentage}%
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Student Name Input */}
                    <div>
                      <label className="block text-white/80 mb-2">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                      />
                    </div>

                    {/* Module Info */}
                    <div className="p-4 rounded-lg bg-white/5">
                      <h4 className="text-white font-semibold mb-2">Certificate Details</h4>
                      <div className="text-white/80 text-sm space-y-1">
                        <div><strong>Module:</strong> {selectedModule.title}</div>
                        <div><strong>Completion:</strong> {selectedModuleProgress.percentage}%</div>
                        {quizScore && (
                          <div><strong>Quiz Score:</strong> {quizScore}%</div>
                        )}
                        <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                      </div>
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleGenerateCertificate}
                      disabled={!studentName.trim() || isGenerating}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        !studentName.trim() || isGenerating
                          ? 'bg-gray-500 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                      }`}
                    >
                      {isGenerating ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating Certificate...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Award size={20} />
                          Generate Certificate
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}

          {/* Certificate History */}
          {certificates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <GlassCard className="p-8 mt-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Certificate History
                </h3>
                
                <div className="space-y-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <div className="text-white font-semibold">{cert.studentName}</div>
                        <div className="text-white/60 text-sm">{cert.moduleTitle}</div>
                        <div className="text-white/40 text-xs">{cert.completionDate}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {cert.score && (
                          <div className="text-green-400 text-sm font-semibold">
                            {cert.score}%
                          </div>
                        )}
                        <button
                          onClick={() => setGeneratedCertificate(cert)}
                          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <FileText size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
