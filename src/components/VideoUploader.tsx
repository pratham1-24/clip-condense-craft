
import React, { useState, useRef, DragEvent } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, FileVideo } from "lucide-react";

interface VideoUploaderProps {
  onVideoSelected: (file: File) => void;
}

const VideoUploader = ({ onVideoSelected }: VideoUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => setDragging(false);
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onVideoSelected(file);
      }
    }
  };
  
  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a valid video file.');
      return false;
    }
    
    // 500MB max file size
    if (file.size > 500 * 1024 * 1024) {
      toast.error('File size must be less than 500MB.');
      return false;
    }
    
    return true;
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onVideoSelected(file);
      }
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`drop-area border-2 border-dashed rounded-lg p-12 text-center cursor-pointer ${dragging ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleButtonClick}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="video/*" 
        className="hidden" 
      />
      
      <FileVideo className="mx-auto h-12 w-12 text-brand mb-4" />
      <h3 className="text-xl font-semibold mb-2">Upload your video</h3>
      <p className="text-muted-foreground mb-4">Drag and drop your video here or click to browse</p>
      
      <Button className="bg-brand hover:bg-brand-dark gap-2">
        <Upload size={18} />
        Select Video
      </Button>
      
      <p className="mt-4 text-sm text-muted-foreground">
        Max file size: 500MB. Supported formats: MP4, AVI, MOV, WMV
      </p>
    </div>
  );
};

export default VideoUploader;
