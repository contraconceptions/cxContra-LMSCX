import QRCode from 'qrcode';
import type { Certificate } from '../content/types';

export const generateVerificationCode = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CX-${timestamp}-${random}`.toUpperCase();
};

export const generateQRCode = async (url: string): Promise<string> => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

export const createCertificateData = (
  studentName: string,
  moduleTitle: string,
  score?: number
): Certificate => {
  const verificationCode = generateVerificationCode();
  
  return {
    id: verificationCode,
    studentName,
    moduleTitle,
    completionDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    verificationCode,
    score,
    generatedAt: Date.now()
  };
};

export const downloadCertificateAsPDF = async (certificate: Certificate): Promise<void> => {
  try {
    // This would typically use @react-pdf/renderer
    // For now, we'll create a simple HTML version that can be printed as PDF
    const verificationUrl = `${window.location.origin}/certificate/verify/${certificate.verificationCode}`;
    const qrCodeDataURL = await generateQRCode(verificationUrl);
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${certificate.moduleTitle}</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .certificate {
              background: white;
              padding: 60px;
              border-radius: 20px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 800px;
              width: 100%;
              position: relative;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              bottom: 20px;
              border: 3px solid #667eea;
              border-radius: 15px;
              pointer-events: none;
            }
            .header {
              margin-bottom: 40px;
            }
            .title {
              font-size: 48px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 24px;
              color: #666;
              margin-bottom: 20px;
            }
            .award-text {
              font-size: 20px;
              color: #333;
              margin: 40px 0;
            }
            .student-name {
              font-size: 36px;
              font-weight: bold;
              color: #667eea;
              margin: 30px 0;
              text-decoration: underline;
              text-decoration-color: #667eea;
            }
            .module-title {
              font-size: 28px;
              color: #333;
              margin: 20px 0;
            }
            .completion-date {
              font-size: 18px;
              color: #666;
              margin: 20px 0;
            }
            .score {
              font-size: 24px;
              color: #28a745;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              margin-top: 60px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .signature {
              text-align: left;
            }
            .signature-line {
              border-bottom: 2px solid #333;
              width: 200px;
              margin: 10px 0;
            }
            .qr-code {
              text-align: right;
            }
            .qr-code img {
              width: 120px;
              height: 120px;
            }
            .verification {
              font-size: 12px;
              color: #999;
              margin-top: 10px;
            }
            @media print {
              body { background: white; }
              .certificate { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="title">CERTIFICATE OF COMPLETION</div>
              <div class="subtitle">Customer Experience Masterclass</div>
            </div>
            
            <div class="award-text">
              This is to certify that
            </div>
            
            <div class="student-name">
              ${certificate.studentName}
            </div>
            
            <div class="award-text">
              has successfully completed
            </div>
            
            <div class="module-title">
              ${certificate.moduleTitle}
            </div>
            
            <div class="completion-date">
              Completed on ${certificate.completionDate}
            </div>
            
            ${certificate.score ? `
              <div class="score">
                Final Score: ${certificate.score}%
              </div>
            ` : ''}
            
            <div class="footer">
              <div class="signature">
                <div>Instructor Signature</div>
                <div class="signature-line"></div>
                <div>Date: ${certificate.completionDate}</div>
              </div>
              
              <div class="qr-code">
                <img src="${qrCodeDataURL}" alt="Verification QR Code" />
                <div class="verification">
                  Verification Code:<br>
                  ${certificate.verificationCode}
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    // Create a new window with the certificate content
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for the QR code to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 1000);
      };
    }
  } catch (error) {
    console.error('Error generating certificate PDF:', error);
    throw new Error('Failed to generate certificate PDF');
  }
};

export const downloadCertificateAsPNG = async (certificate: Certificate): Promise<void> => {
  try {
    // For PNG download, we'll use html2canvas to capture the certificate
    const verificationUrl = `${window.location.origin}/certificate/verify/${certificate.verificationCode}`;
    const qrCodeDataURL = await generateQRCode(verificationUrl);
    
    // Create a temporary element with the certificate content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
      <div style="
        font-family: 'Times New Roman', serif;
        background: white;
        padding: 60px;
        border-radius: 20px;
        text-align: center;
        max-width: 800px;
        width: 800px;
        position: relative;
        border: 3px solid #667eea;
      ">
        <div style="margin-bottom: 40px;">
          <div style="font-size: 48px; font-weight: bold; color: #333; margin-bottom: 10px;">
            CERTIFICATE OF COMPLETION
          </div>
          <div style="font-size: 24px; color: #666; margin-bottom: 20px;">
            Customer Experience Masterclass
          </div>
        </div>
        
        <div style="font-size: 20px; color: #333; margin: 40px 0;">
          This is to certify that
        </div>
        
        <div style="font-size: 36px; font-weight: bold; color: #667eea; margin: 30px 0; text-decoration: underline;">
          ${certificate.studentName}
        </div>
        
        <div style="font-size: 20px; color: #333; margin: 40px 0;">
          has successfully completed
        </div>
        
        <div style="font-size: 28px; color: #333; margin: 20px 0;">
          ${certificate.moduleTitle}
        </div>
        
        <div style="font-size: 18px; color: #666; margin: 20px 0;">
          Completed on ${certificate.completionDate}
        </div>
        
        ${certificate.score ? `
          <div style="font-size: 24px; color: #28a745; font-weight: bold; margin: 20px 0;">
            Final Score: ${certificate.score}%
          </div>
        ` : ''}
        
        <div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: left;">
            <div>Instructor Signature</div>
            <div style="border-bottom: 2px solid #333; width: 200px; margin: 10px 0;"></div>
            <div>Date: ${certificate.completionDate}</div>
          </div>
          
          <div style="text-align: right;">
            <img src="${qrCodeDataURL}" alt="Verification QR Code" style="width: 120px; height: 120px;" />
            <div style="font-size: 12px; color: #999; margin-top: 10px;">
              Verification Code:<br>
              ${certificate.verificationCode}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Hide the temporary element
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    document.body.appendChild(tempDiv);
    
    // Import html2canvas dynamically
    const html2canvas = (await import('html2canvas')).default;
    
    // Capture the certificate as canvas
    const canvas = await html2canvas(tempDiv.firstElementChild as HTMLElement, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    });
    
    // Convert to PNG and download
    const link = document.createElement('a');
    link.download = `certificate-${certificate.studentName.replace(/\s+/g, '-')}-${certificate.verificationCode}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Clean up
    document.body.removeChild(tempDiv);
  } catch (error) {
    console.error('Error generating certificate PNG:', error);
    throw new Error('Failed to generate certificate PNG');
  }
};
