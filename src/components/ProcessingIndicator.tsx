
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, FileAudio, FileText, FileCheck } from "lucide-react";

export type ProcessingStage = 'extracting' | 'transcribing' | 'summarizing' | 'complete';

interface ProcessingIndicatorProps {
  stage: ProcessingStage;
}

const ProcessingIndicator = ({ stage }: ProcessingIndicatorProps) => {
  const stages = [
    { id: 'extracting', label: 'Extracting Audio', icon: FileAudio },
    { id: 'transcribing', label: 'Transcribing Content', icon: FileText },
    { id: 'summarizing', label: 'Generating Summary', icon: FileCheck },
  ];
  
  const getCurrentStageIndex = () => {
    if (stage === 'complete') return stages.length;
    return stages.findIndex(s => s.id === stage);
  };
  
  const currentStageIndex = getCurrentStageIndex();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">Processing your video</h3>
            <p className="text-muted-foreground">This may take a few minutes depending on the video length</p>
          </div>
          
          <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
            <div className="animate-progress progress-bar"></div>
          </div>
          
          <div className="space-y-6">
            {stages.map((s, index) => {
              const Icon = s.icon;
              const isActive = index === currentStageIndex;
              const isComplete = index < currentStageIndex;
              
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-brand text-white animate-pulse-gentle' : 
                      isComplete ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                    {isActive ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                  <span className={`${isActive ? 'font-medium text-brand' : 
                    isComplete ? 'font-medium text-green-600' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                  {isActive && (
                    <span className="ml-auto text-xs text-muted-foreground">In progress</span>
                  )}
                  {isComplete && (
                    <span className="ml-auto text-xs text-green-600">Complete</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingIndicator;
