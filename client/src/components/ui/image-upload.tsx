import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (imageUrl: string | null) => void;
  currentImage?: string | null;
  className?: string;
  aspectRatio?: "square" | "wide" | "tall";
  maxSizeMB?: number;
}

export function ImageUpload({
  onImageChange,
  currentImage = null,
  className = "",
  aspectRatio = "square",
  maxSizeMB = 5
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(currentImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate aspect ratio classes
  const aspectRatioClass = {
    square: "aspect-square",
    wide: "aspect-video",
    tall: "aspect-[3/4]"
  }[aspectRatio];

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setImagePreview(imageUrl);
      onImageChange(imageUrl);
    };
    
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setImagePreview(null);
    onImageChange(null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Image</label>
        {imagePreview && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearImage}
            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
      
      {imagePreview ? (
        <div className={`relative rounded-md overflow-hidden border ${aspectRatioClass} bg-gray-100 mb-2`}>
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover" 
          />
        </div>
      ) : (
        <div 
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md ${aspectRatioClass} 
            p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors mb-2`}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            No image selected
          </p>
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="w-full"
        >
          <UploadCloud className="h-4 w-4 mr-2" />
          Upload Image
        </Button>
      </div>
      
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}