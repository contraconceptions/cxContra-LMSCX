import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Wifi, WifiOff, HardDrive, CheckCircle } from 'lucide-react';
import { useLMSStore } from '../../store/useLmsStore';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';

interface OfflineModule {
  moduleId: string;
  downloadedAt: number;
  size: number;
  version: string;
}

interface DownloadManagerProps {
  className?: string;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ className }) => {
  const { modules } = useLMSStore();
  const [offlineModules, setOfflineModules] = useState<OfflineModule[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadingModules, setDownloadingModules] = useState<Set<string>>(new Set());
  const [storageUsed, setStorageUsed] = useState(0);

  useEffect(() => {
    // Load offline modules from IndexedDB
    loadOfflineModules();
    
    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadOfflineModules = async () => {
    try {
      // In a real implementation, this would load from IndexedDB
      // For now, we'll simulate with localStorage
      const stored = localStorage.getItem('offline-modules');
      if (stored) {
        const modules = JSON.parse(stored);
        setOfflineModules(modules);
        
        // Calculate storage used
        const totalSize = modules.reduce((sum: number, mod: OfflineModule) => sum + mod.size, 0);
        setStorageUsed(totalSize);
      }
    } catch (error) {
      console.error('Failed to load offline modules:', error);
    }
  };

  const downloadModule = async (moduleId: string) => {
    if (downloadingModules.has(moduleId)) return;
    
    setDownloadingModules(prev => new Set(prev).add(moduleId));
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const module = modules?.find(m => m.id === moduleId);
      if (!module) return;
      
      // Calculate estimated size (rough estimate)
      const estimatedSize = module.lessons.length * 50; // 50KB per lesson estimate
      
      const offlineModule: OfflineModule = {
        moduleId,
        downloadedAt: Date.now(),
        size: estimatedSize,
        version: '1.0.0'
      };
      
      const updatedModules = [...offlineModules, offlineModule];
      setOfflineModules(updatedModules);
      localStorage.setItem('offline-modules', JSON.stringify(updatedModules));
      
      // Update storage used
      setStorageUsed(prev => prev + estimatedSize);
      
    } catch (error) {
      console.error('Failed to download module:', error);
    } finally {
      setDownloadingModules(prev => {
        const newSet = new Set(prev);
        newSet.delete(moduleId);
        return newSet;
      });
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      const updatedModules = offlineModules.filter(mod => mod.moduleId !== moduleId);
      setOfflineModules(updatedModules);
      localStorage.setItem('offline-modules', JSON.stringify(updatedModules));
      
      // Update storage used
      const removedModule = offlineModules.find(mod => mod.moduleId === moduleId);
      if (removedModule) {
        setStorageUsed(prev => prev - removedModule.size);
      }
    } catch (error) {
      console.error('Failed to remove module:', error);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const isModuleOffline = (moduleId: string) => {
    return offlineModules.some(mod => mod.moduleId === moduleId);
  };

  const getStoragePercentage = () => {
    const maxStorage = 50 * 1024 * 1024; // 50MB limit
    return Math.round((storageUsed / maxStorage) * 100);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Status Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive size={24} />
            Offline Manager
          </h2>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi size={20} className="text-green-400" />
            ) : (
              <WifiOff size={20} className="text-red-400" />
            )}
            <span className="text-sm text-white/60">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Storage Usage */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Storage Used</span>
            <span>{formatBytes(storageUsed)} / 50 MB</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getStoragePercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-white/60 mt-1">
            {getStoragePercentage()}% used
          </div>
        </div>

        {!isOnline && (
          <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
            <p className="text-yellow-200 text-sm">
              You're currently offline. Offline modules are available for viewing.
            </p>
          </div>
        )}
      </GlassCard>

      {/* Module List */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Available Modules</h3>
        <div className="space-y-3">
          {modules?.map((module) => {
            const isOffline = isModuleOffline(module.id);
            const isDownloading = downloadingModules.has(module.id);
            const offlineModule = offlineModules.find(mod => mod.moduleId === module.id);
            
            return (
              <motion.div
                key={module.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${module.color}`}>
                      <span className="text-white font-bold text-sm">
                        {module.title.split(' ')[1]}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{module.title}</h4>
                      <p className="text-white/60 text-sm">{module.subtitle}</p>
                    </div>
                  </div>
                  
                  {isOffline && offlineModule && (
                    <div className="text-xs text-white/50">
                      Downloaded: {formatDate(offlineModule.downloadedAt)} • 
                      Size: {formatBytes(offlineModule.size)}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isOffline ? (
                    <>
                      <CheckCircle size={20} className="text-green-400" />
                      <button
                        onClick={() => removeModule(module.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-400/20 transition-colors"
                        title="Remove from offline storage"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => downloadModule(module.id)}
                      disabled={isDownloading || !isOnline}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                        isDownloading || !isOnline
                          ? 'bg-gray-500 text-white cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      )}
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Offline Modules Summary */}
      {offlineModules.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Offline Modules</h3>
          <div className="space-y-2">
            {offlineModules.map((offlineModule) => {
              const module = modules?.find(m => m.id === offlineModule.moduleId);
              return (
                <div key={offlineModule.moduleId} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div>
                    <div className="text-white font-medium">{module?.title}</div>
                    <div className="text-white/60 text-sm">
                      {formatBytes(offlineModule.size)} • Downloaded {formatDate(offlineModule.downloadedAt)}
                    </div>
                  </div>
                  <CheckCircle size={20} className="text-green-400" />
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default DownloadManager;
