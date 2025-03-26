
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { X, Upload, File as FileIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { ImpairmentFormData } from "../types";

interface FileUploadFieldProps {
  form: UseFormReturn<ImpairmentFormData>;
}

export function FileUploadField({ form }: FileUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false);
  
  const files = form.watch("attachments") || [];
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files);
    const currentFiles = form.getValues("attachments") || [];
    
    form.setValue("attachments", [...currentFiles, ...newFiles], {
      shouldValidate: true,
    });
    
    // Clear the input value so the same file can be selected again
    e.target.value = "";
  };
  
  const removeFile = (index: number) => {
    const currentFiles = [...(form.getValues("attachments") || [])];
    currentFiles.splice(index, 1);
    form.setValue("attachments", currentFiles, {
      shouldValidate: true,
    });
  };
  
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
    
    if (e.dataTransfer.files?.length) {
      const newFiles = Array.from(e.dataTransfer.files);
      const currentFiles = form.getValues("attachments") || [];
      
      form.setValue("attachments", [...currentFiles, ...newFiles], {
        shouldValidate: true,
      });
    }
  };

  return (
    <FormField
      control={form.control}
      name="attachments"
      render={() => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Supporting Documents</FormLabel>
          <FormControl>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">
                  Drag & drop files here, or{" "}
                  <label className="cursor-pointer text-primary underline">
                    browse
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={onChangeHandler}
                    />
                  </label>
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload documentation supporting the revaluation (e.g., appraisal reports, market studies)
                </p>
              </div>
            </div>
          </FormControl>
          
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Attached files:</p>
              <ul className="space-y-2">
                {files.map((file, i) => (
                  <li key={i} className="flex items-center justify-between rounded border px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(i)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <FormDescription>
            Attach relevant documents to support your revaluation decision. 
            Maximum allowed size: 10MB per file.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
