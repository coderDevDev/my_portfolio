'use client';

import { useState } from 'react';
import { Download, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SimplePDFViewerProps {
  file: string;
  className?: string;
}

export function SimplePDFViewer({
  file,
  className = ''
}: SimplePDFViewerProps) {
  const [loadError, setLoadError] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = 'Dexter_Miranda_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${className}`}>
      {!loadError ? (
        <div className="relative w-full h-full">
          <iframe
            src={`${file}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-0 bg-white rounded"
            title="Resume PDF"
            onError={() => setLoadError(true)}
          />
        </div>
      ) : (
        <Card className="bg-[#252526] border-[#3e3e3e] h-full flex items-center justify-center">
          <CardContent className="text-center p-8">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              PDF Viewer Not Available
            </h3>
            <p className="text-sm opacity-70 mb-6">
              Your browser doesn't support inline PDF viewing. Please use one of
              the options below:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleDownload}
                className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                <a href={file} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
