
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface UploadProgressProps {
  fileName: string;
  onComplete: () => void;
}

const loadingTexts = [
  "Analyzing STL file structure...",
  "Processing geometry data...",
  "Optimizing mesh quality...",
  "Preparing final touches...",
];

const UploadProgress = ({ fileName, onComplete }: UploadProgressProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">{fileName}</h3>
        <p className="text-sm text-gray-500 h-5 animate-fade-in">
          {loadingTexts[currentTextIndex]}
        </p>
      </div>

      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <p className="text-center text-sm font-medium">{progress}%</p>
    </div>
  );
};

export default UploadProgress;
