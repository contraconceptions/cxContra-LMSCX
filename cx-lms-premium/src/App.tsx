import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { modules } from './content/modules';
import { useLMSStore } from './store/useLmsStore';
import AppShell from './components/chrome/AppShell';
import ModuleView from './routes/ModuleView';
import LessonView from './routes/LessonView';
import QuizView from './routes/QuizView';
import JournalView from './routes/JournalView';
import PresenterView from './routes/PresenterView';
import CertificateView from './routes/CertificateView';
import OfflineView from './routes/OfflineView';
import { useKeyboardNavigation } from './lib/keyboard';

function App() {
  useKeyboardNavigation();

  // Initialize store with modules
  useEffect(() => {
    useLMSStore.setState({ modules });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <AppShell>
          <Routes>
            <Route path="/" element={<ModuleView />} />
            <Route path="/modules" element={<ModuleView />} />
            <Route path="/modules/:moduleId" element={<ModuleView />} />
            <Route path="/modules/:moduleId/lessons/:lessonId" element={<LessonView />} />
            <Route path="/quiz" element={<QuizView />} />
            <Route path="/journal" element={<JournalView />} />
            <Route path="/presenter" element={<PresenterView />} />
            <Route path="/certificate" element={<CertificateView />} />
            <Route path="/offline" element={<OfflineView />} />
          </Routes>
        </AppShell>
      </div>
    </Router>
  );
}

export default App;