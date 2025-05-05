import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  mediaType?: string; // Added for testimonial editor support
}

export function MediaUploader({
  value = "",
  onChange,
  accept = "image/*",
  maxSize = 5, // Default 5MB
  mediaType, // Use mediaType if provided
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Upload failed");
      }

      const data = await response.json();
      console.log("Upload response:", data);
      
      // Make sure the URL is correct for the environment
      const imageUrl = data.url.startsWith('/') ? data.url : `/${data.url}`;
      console.log("Final image URL being set:", imageUrl);
      
      onChange(imageUrl);
      toast({
        title: "Upload successful",
        description: `File uploaded: ${imageUrl}`,
        variant: "default"
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Something went wrong. Make sure you're uploading an image in jpg, png, gif or webp format.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          disabled={isUploading}
          className="w-full justify-center"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {value ? "Change file" : "Upload file"}
            </>
          )}
        </Button>
        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onChange("")}
            disabled={isUploading}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </Button>
        )}
      </div>
      {value && (
        <div className="text-sm text-muted-foreground truncate">
          Current file: {value.split('/').pop()}
        </div>
      )}
    </div>
  );
}