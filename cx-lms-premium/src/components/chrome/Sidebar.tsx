import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Home, 
  Brain, 
  FileText, 
  Presentation, 
  Award,
  Settings,
  X
} from 'lucide-react';
import { useLMSStore, useProgress } from '../../store/useLmsStore';
import { modules } from '../../content/modules';
import { cn } from '../../lib/utils';

const Sidebar: React.FC = () => {
  const { 
    currentModuleId, 
    setCurrentModule, 
    toggleSidebar
  } = useLMSStore();
  
  const { percentage } = useProgress();

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'modules', label: 'Modules', icon: BookOpen, href: '/modules' },
    { id: 'quiz', label: 'Quiz', icon: Brain, href: '/quiz' },
    { id: 'journal', label: 'Journal', icon: FileText, href: '/journal' },
    { id: 'presenter', label: 'Presenter', icon: Presentation, href: '/presenter' },
    { id: 'certificate', label: 'Certificate', icon: Award, href: '/certificate' },
  ];

  return (
    <div className="h-full glass-nav flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">CX Mastery</h1>
              <p className="text-xs text-white/60">Premium LMS</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Overall Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <motion.a
            key={item.id}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
              "hover:bg-white/10 hover:shadow-glow",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <item.icon className="w-5 h-5 text-white/80" />
            <span className="text-white font-medium">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      {/* Modules */}
      <div className="p-4 border-t border-white/10">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Modules</h3>
        <div className="space-y-2">
          {modules.map((module, index) => (
            <motion.button
              key={module.id}
              onClick={() => setCurrentModule(module.id)}
              className={cn(
                "w-full text-left p-3 rounded-lg transition-all duration-200",
                "hover:bg-white/10 hover:shadow-glow",
                currentModuleId === module.id && "bg-white/20 shadow-glow"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  `module-gradient-${(index % 6) + 1}`
                )} />
                <div>
                  <p className="text-sm font-medium text-white">
                    Module {index + 1}
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {module.title.split(':')[1]?.trim() || module.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/10 transition-colors">
          <Settings className="w-5 h-5 text-white/80" />
          <span className="text-white font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
