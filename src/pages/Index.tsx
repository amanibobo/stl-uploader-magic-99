
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import UploadProgress from "../components/UploadProgress";
import UploadComplete from "../components/UploadComplete";

type UploadState = "idle" | "uploading" | "complete";

const Index = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadState("uploading");
  };

  const handleUploadComplete = () => {
    setUploadState("complete");
  };

  const handleReset = () => {
    setUploadState("idle");
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">STL File Processor</h1>
          <p className="text-gray-600">Upload your 3D models with ease</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300">
          {uploadState === "idle" && <FileUploader onFileSelect={handleFileSelect} />}
          {uploadState === "uploading" && selectedFile && (
            <UploadProgress
              fileName={selectedFile.name}
              onComplete={handleUploadComplete}
            />
          )}
          {uploadState === "complete" && <UploadComplete onReset={handleReset} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
