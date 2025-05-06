import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, AlignLeft } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter text here...",
  className = "min-h-[100px]"
}) => {
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertAtCursor = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newValue);
    
    // Set cursor position after formatting
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          start + before.length, 
          start + before.length + selectedText.length
        );
      }
    }, 0);
  };

  const handleBold = () => {
    insertAtCursor('<b>', '</b>');
  };

  const handleLineBreak = () => {
    insertAtCursor('<br>', '');
  };

  return (
    <div className="rich-text-editor space-y-2">
      <div className="flex space-x-2 bg-gray-50 p-1 rounded-md">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleBold}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={handleLineBreak}
          title="Line Break"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
      <div className="text-xs text-gray-500">
        Use the toolbar to format text or manually add HTML tags: &lt;b&gt;bold&lt;/b&gt;, &lt;br&gt; for line breaks
      </div>
    </div>
  );
};

export default RichTextEditor;