
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, CheckCircle, File } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".stl")) {
      onFileSelect(file);
    } else {
      toast.error("Please upload an STL file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".stl")) {
      onFileSelect(file);
    } else {
      toast.error("Please upload an STL file");
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-[400px] p-8 text-center border-2 border-dashed rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm ${
        dragActive
          ? "border-primary/50 bg-primary/5"
          : "border-gray-300 hover:border-primary/30"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".stl"
      />

      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Upload your STL file</h3>
        <p className="text-sm text-gray-500">
          Drag and drop your file here, or click to select
        </p>
        <button
          onClick={onButtonClick}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          Select File
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
