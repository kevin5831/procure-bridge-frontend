
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  id: string;
  placeholder: string;
}

export function CustomSelect({ options, value, onChange, id, placeholder }: CustomSelectProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        const dropdownElement = document.getElementById(id);
        if (dropdownElement) {
          dropdownElement.style.display = 'none';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [id]);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-between",
          !value && "text-muted-foreground"
        )}
        onClick={(e) => {
          e.preventDefault();
          const dropdownElement = document.getElementById(id);
          if (dropdownElement) {
            dropdownElement.style.display = dropdownElement.style.display === 'none' ? 'block' : 'none';
          }
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>
      <div
        id={id}
        className="absolute top-[calc(100%+4px)] left-0 z-[9999] w-full bg-white border rounded-md shadow-lg"
        style={{ display: 'none' }}
      >
        <div className="py-1">
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "px-3 py-2 cursor-pointer hover:bg-gray-100",
                option.value === value && "bg-gray-100"
              )}
              onClick={() => {
                onChange(option.value);
                const dropdownElement = document.getElementById(id);
                if (dropdownElement) {
                  dropdownElement.style.display = 'none';
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
