
import React from 'react';
import { FileVideo } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 border-b">
      <div className="container flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand/10 p-2 rounded-lg">
            <FileVideo className="h-6 w-6 text-brand" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            AI Video Summarizer
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
