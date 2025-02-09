
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

const carouselImages = [
  "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
];

const UploadProgress = ({ fileName, onComplete }: UploadProgressProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearInterval(imageInterval);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">{fileName}</h3>
        <p className="text-sm text-gray-500 h-5 animate-fade-in">
          {loadingTexts[currentTextIndex]}
        </p>
      </div>

      <Carousel className="w-full max-w-md mx-auto">
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="basis-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-video w-full overflow-hidden rounded-xl"
              >
                <img
                  src={image}
                  alt={`Demo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
