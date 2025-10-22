import React from 'react';
import { X } from 'lucide-react';
import { useLMSStore } from '../../store/useLmsStore';

interface JournalPanelProps {}

const JournalPanel: React.FC<JournalPanelProps> = () => {
  const { 
    journal, 
    currentLessonId, 
    saveJournalEntry, 
    toggleJournal 
  } = useLMSStore();

  const currentEntry = currentLessonId ? journal[currentLessonId] : null;

  const handleSave = (content: string) => {
    if (currentLessonId) {
      saveJournalEntry(currentLessonId, content);
    }
  };

  return (
    <div className="h-full glass-nav flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Journal</h2>
          <button
            onClick={toggleJournal}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <textarea
          value={currentEntry?.content || ''}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Write your thoughts, insights, and reflections here..."
          className="w-full h-full bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
        />
      </div>
    </div>
  );
};

export default JournalPanel;
