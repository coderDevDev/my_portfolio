'use client';

import { useState } from 'react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { StatusBar } from '@/components/status-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SimplePDFViewer } from '@/components/simple-pdf-viewer';
import Link from 'next/link';

export default function ResumePage() {
  const resumeUrl = '/resume.pdf'; // Place your PDF in the public folder
  const [useAdvancedViewer, setUseAdvancedViewer] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Dexter_Miranda_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button asChild variant="ghost" size="sm" className="mr-4">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-[#569cd6]">Resume</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-[#3e3e3e] hover:bg-[#2a2d2e]">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <Card className="bg-[#252526] border-[#3e3e3e]">
            <CardContent className="p-0">
              <div className="h-[80vh]">
                <SimplePDFViewer file={resumeUrl} className="h-full" />
              </div>
            </CardContent>
          </Card>

          {/* Alternative viewing options */}
          <div className="mt-4 text-center">
            <p className="text-sm opacity-70 mb-2">
              Having trouble viewing the PDF?
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Button asChild variant="link" className="text-[#569cd6]">
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  Open in browser
                </a>
              </Button>
              <span className="text-sm opacity-50">•</span>
              <Button
                variant="link"
                onClick={handleDownload}
                className="text-[#569cd6]">
                Download directly
              </Button>
              <span className="text-sm opacity-50">•</span>
            </div>
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  );
}
