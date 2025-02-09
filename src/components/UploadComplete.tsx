
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface UploadCompleteProps {
  onReset: () => void;
}

const UploadComplete = ({ onReset }: UploadCompleteProps) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="inline-block p-4 rounded-full bg-green-100"
      >
        <CheckCircle className="w-12 h-12 text-green-500" />
      </motion.div>

      <h3 className="text-xl font-medium">Fine-tuning in Progress!</h3>
      <p className="text-sm text-gray-500">Your object is being optimized on our robot VLM</p>

      <button
        onClick={onReset}
        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200"
      >
        Upload Another File
      </button>
    </motion.div>
  );
};

export default UploadComplete;
