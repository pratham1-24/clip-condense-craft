
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay = ({ summary }: SummaryDisplayProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.success('Summary copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy summary');
    }
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'video-summary.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Summary downloaded!');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-center">
          <span>Summary</span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1"
              onClick={handleCopy}
            >
              <Copy size={14} />
              <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1"
              onClick={handleDownload}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryDisplay;
