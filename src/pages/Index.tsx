
import React, { useState } from 'react';
import Header from '@/components/Header';
import VideoUploader from '@/components/VideoUploader';
import ProcessingIndicator, { ProcessingStage } from '@/components/ProcessingIndicator';
import VideoPlayer from '@/components/VideoPlayer';
import SummaryDisplay from '@/components/SummaryDisplay';
import { uploadVideo, processVideo } from '@/services/api';
import { toast } from 'sonner';

const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('extracting');
  const [summary, setSummary] = useState<string | null>(null);

  const handleVideoSelected = async (file: File) => {
    try {
      toast.info(`Processing ${file.name}`, {
        description: "Your video is being uploaded and processed"
      });
      
      setIsProcessing(true);
      
      // Upload the video
      const url = await uploadVideo(file);
      setVideoUrl(url);
      
      // Process the video to get a summary
      const result = await processVideo(url, (stage) => {
        setProcessingStage(stage);
      });
      
      setSummary(result);
      setIsProcessing(false);
      
      toast.success("Video processing complete!", {
        description: "Your video summary is ready"
      });
    } catch (error) {
      console.error("Error processing video:", error);
      setIsProcessing(false);
      toast.error("Error processing video", {
        description: "Please try again with a different video"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 md:py-12">
        <div className="container max-w-5xl">
          {!videoUrl && (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4 text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  Summarize any video with AI
                </h2>
                <p className="text-muted-foreground">
                  Upload a video and our AI will extract the audio, transcribe it, and generate a concise summary.
                </p>
              </div>
              
              <VideoUploader onVideoSelected={handleVideoSelected} />
            </div>
          )}
          
          {videoUrl && (
            <div className="space-y-8">
              {isProcessing ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <VideoPlayer videoUrl={videoUrl} />
                  <ProcessingIndicator stage={processingStage} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <VideoPlayer videoUrl={videoUrl} />
                  {summary && <SummaryDisplay summary={summary} />}
                </div>
              )}
              
              {!isProcessing && (
                <div className="flex justify-center">
                  <button 
                    onClick={() => {
                      setVideoUrl(null);
                      setSummary(null);
                    }}
                    className="text-brand hover:text-brand-dark underline font-medium"
                  >
                    Process another video
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>AI Video Summarizer uses FFmpeg, Whisper Small, and BART models to process videos</p>
          <p className="mt-1">© {new Date().getFullYear()} AI Video Summarizer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
