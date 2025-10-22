import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLMSStore } from '../../store/useLmsStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import JournalPanel from '../lms/JournalPanel';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { sidebarOpen, journalOpen } = useLMSStore();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-80 flex-shrink-0"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto custom-scrollbar">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Journal Panel */}
      <AnimatePresence>
        {journalOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-96 flex-shrink-0"
          >
            <JournalPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppShell;
