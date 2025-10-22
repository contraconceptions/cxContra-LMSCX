import React from 'react';
import { motion } from 'framer-motion';
import { Download, WifiOff, HardDrive } from 'lucide-react';
import DownloadManager from '../components/offline/DownloadManager';
import GradientHeader from '../components/ui/GradientHeader';

const OfflineView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950">
      <GradientHeader
        title="Offline Manager"
        subtitle="Download modules for offline learning"
        gradient="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
        icon="📱"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <DownloadManager />
        </div>
      </div>
    </div>
  );
};

export default OfflineView;
