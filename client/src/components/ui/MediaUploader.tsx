import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function MediaUploader({
  value,
  onChange,
  accept = "image/*",
  maxSize = 5 // Default 5MB
}: MediaUploaderProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Please select a file smaller than ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress for better UX
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 10;
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 200);

      // Send to server
      const response = await apiRequest("POST", "/api/upload", formData);
      
      clearInterval(interval);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to upload file");
      }

      const data = await response.json();
      setUploadProgress(100);
      
      // Return the URL of the uploaded file
      onChange(data.url);
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReset = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-4">
        {value ? (
          <div className="relative rounded-md overflow-hidden border border-input">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Button 
                size="icon" 
                variant="outline" 
                className="h-8 w-8 bg-white opacity-80 hover:opacity-100"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {accept.includes("image") ? (
              <img 
                src={value} 
                alt="Uploaded media"
                className="object-cover w-full h-32"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x400?text=Error+Loading+Image';
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-32 bg-gray-100">
                <span className="text-gray-500">File uploaded</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md p-6 transition-colors hover:border-gray-400">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="outline"
              className="mb-2"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="flex items-center gap-2">
                  <svg 
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Uploading {Math.round(uploadProgress)}%...
                </div>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  <span>Upload Media</span>
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500">
              {accept.includes("image") ? "PNG, JPG, GIF up to " : "Files up to "}
              {maxSize}MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}