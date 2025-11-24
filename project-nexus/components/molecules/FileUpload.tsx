import React, { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  error?: string;
  onFileSelect: (file: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ error, onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    setFileName(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-900">
        Resume/CV <span className="text-red-500">*</span>
      </label>
      
      {!fileName ? (
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:bg-slate-50",
            error ? "border-red-300 bg-red-50" : "border-slate-400 bg-white"
          )}
        >
          <div className="rounded-full bg-slate-100 p-3 group-hover:bg-white transition-colors">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <p className="mt-2 text-sm font-medium text-primary">
            Click to upload or drag and drop
          </p>
          <p className="mt-1 text-xs text-color-slate-600">
            PDF, DOCX, TXT (max 5MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-lg border border-primary-light bg-primary-light/20 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-slate-900">{fileName}</span>
          </div>
          <button onClick={handleRemove} type="button" className="text-slate-600 hover:text-red-500">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};