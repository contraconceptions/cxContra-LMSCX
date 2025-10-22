import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Volume2, 
  VolumeX,
  Sun,
  Moon,
  Monitor,
  Presentation,
  Wifi,
  WifiOff,
  Download
} from 'lucide-react';
import { useLMSStore } from '../../store/useLmsStore';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { 
    toggleSidebar, 
    settings, 
    updateSettings,
    currentModuleId,
    currentLessonId 
  } = useLMSStore();

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showDownloadManager, setShowDownloadManager] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const currentModule = useLMSStore((state) => 
    state.modules?.find(m => m.id === currentModuleId)
  );

  const currentLesson = currentModule?.lessons.find(l => l.id === currentLessonId);

  return (
    <div className="glass-nav border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-white/80">
            {currentModule && (
              <>
                <span className="font-medium">{currentModule.title}</span>
                {currentLesson && (
                  <>
                    <span>/</span>
                    <span>{currentLesson.title}</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search lessons, topics..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Offline indicator */}
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi size={16} className="text-green-400" />
            ) : (
              <WifiOff size={16} className="text-red-400" />
            )}
            <span className="text-xs text-white/60">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Download manager */}
          <button
            onClick={() => setShowDownloadManager(!showDownloadManager)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Offline Manager"
          >
            <Download size={20} className="text-white" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => updateSettings({ soundOn: !settings.soundOn })}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {settings.soundOn ? (
              <Volume2 className="w-5 h-5 text-white" />
            ) : (
              <VolumeX className="w-5 h-5 text-white/60" />
            )}
          </button>

          {/* Presenter Mode */}
          {currentLesson && (
            <button
              onClick={() => navigate('/presenter')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Enter Presenter Mode"
            >
              <Presentation className="w-5 h-5 text-white" />
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => {
              const themes = ['light', 'dark', 'auto'] as const;
              const currentIndex = themes.indexOf(settings.theme);
              const nextTheme = themes[(currentIndex + 1) % themes.length];
              updateSettings({ theme: nextTheme });
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {settings.theme === 'light' && <Sun className="w-5 h-5 text-white" />}
            {settings.theme === 'dark' && <Moon className="w-5 h-5 text-white" />}
            {settings.theme === 'auto' && <Monitor className="w-5 h-5 text-white" />}
          </button>

          {/* Notifications */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
