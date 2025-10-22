import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Share2, QrCode } from 'lucide-react';
import type { Certificate } from '../../content/types';
import { downloadCertificateAsPDF, downloadCertificateAsPNG, generateQRCode } from '../../lib/certificates';
import GlassCard from '../ui/GlassCard';
import { cn } from '../../lib/utils';

interface CertificatePreviewProps {
  certificate: Certificate;
  onClose?: () => void;
  className?: string;
}

const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  certificate,
  onClose,
  className
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');

  React.useEffect(() => {
    const loadQRCode = async () => {
      try {
        const verificationUrl = `${window.location.origin}/certificate/verify/${certificate.verificationCode}`;
        const qrCode = await generateQRCode(verificationUrl);
        setQrCodeDataURL(qrCode);
      } catch (error) {
        console.error('Failed to load QR code:', error);
      }
    };
    loadQRCode();
  }, [certificate.verificationCode]);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await downloadCertificateAsPDF(certificate);
    } catch (error) {
      console.error('Failed to download PDF:', error);
      alert('Failed to download PDF certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPNG = async () => {
    setIsGenerating(true);
    try {
      await downloadCertificateAsPNG(certificate);
    } catch (error) {
      console.error('Failed to download PNG:', error);
      alert('Failed to download PNG certificate');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Certificate: ${certificate.moduleTitle}`,
      text: `${certificate.studentName} completed ${certificate.moduleTitle}`,
      url: `${window.location.origin}/certificate/verify/${certificate.verificationCode}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Certificate verification link copied to clipboard!');
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Certificate Preview</h2>
          <p className="text-white/60">Your certificate is ready for download</p>
        </div>

        {/* Certificate Preview */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="relative">
            {/* Decorative Border */}
            <div className="absolute inset-0 border-4 border-blue-500 rounded-2xl opacity-20" />
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                CERTIFICATE OF COMPLETION
              </h1>
              <p className="text-xl text-gray-600">Customer Experience Masterclass</p>
            </div>

            {/* Award Text */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
              <div className="text-3xl font-bold text-blue-600 mb-4 underline">
                {certificate.studentName}
              </div>
              <p className="text-lg text-gray-700 mb-4">has successfully completed</p>
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                {certificate.moduleTitle}
              </div>
              <p className="text-gray-600">
                Completed on {certificate.completionDate}
              </p>
              {certificate.score && (
                <div className="text-xl font-bold text-green-600 mt-4">
                  Final Score: {certificate.score}%
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end mt-12">
              <div>
                <p className="text-gray-700 mb-2">Instructor Signature</p>
                <div className="border-b-2 border-gray-400 w-48 mb-2" />
                <p className="text-gray-600 text-sm">
                  Date: {certificate.completionDate}
                </p>
              </div>
              
              <div className="text-center">
                {qrCodeDataURL && (
                  <div className="mb-2">
                    <img 
                      src={qrCodeDataURL} 
                      alt="Verification QR Code" 
                      className="w-24 h-24 mx-auto"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Verification Code:<br />
                  {certificate.verificationCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
              isGenerating
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={20} />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </motion.button>

          <motion.button
            onClick={handleDownloadPNG}
            disabled={isGenerating}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
              isGenerating
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image size={20} />
            {isGenerating ? 'Generating...' : 'Download PNG'}
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 size={20} />
            Share Certificate
          </motion.button>
        </div>

        {/* Certificate Details */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
            <div>
              <strong>Student:</strong> {certificate.studentName}
            </div>
            <div>
              <strong>Module:</strong> {certificate.moduleTitle}
            </div>
            <div>
              <strong>Completion Date:</strong> {certificate.completionDate}
            </div>
            <div>
              <strong>Verification Code:</strong> {certificate.verificationCode}
            </div>
            {certificate.score && (
              <div>
                <strong>Score:</strong> {certificate.score}%
              </div>
            )}
            <div>
              <strong>Generated:</strong> {new Date(certificate.generatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <QrCode size={20} className="text-blue-400 mt-1" />
            <div>
              <h4 className="text-blue-300 font-semibold mb-2">Certificate Verification</h4>
              <p className="text-blue-200 text-sm mb-2">
                This certificate can be verified using the QR code or verification code above.
              </p>
              <p className="text-blue-200 text-xs">
                Verification URL: {window.location.origin}/certificate/verify/{certificate.verificationCode}
              </p>
            </div>
          </div>
        </div>

        {onClose && (
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              Close Preview
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default CertificatePreview;
