
"use client"

import React from "react";
import { Combobox } from "./combobox";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

export function CustomSelect({ 
  options = [], 
  value = "", 
  onChange, 
  placeholder, 
  className, 
  disabled = false 
}: CustomSelectProps) {
  // If disabled, provide a noop function
  const handleChange = disabled ? () => {} : onChange;
  
  const handleSelectChange = React.useCallback((selectedValue: string) => {
    // Pass the selected value to the onChange handler
    handleChange(selectedValue);
  }, [handleChange]);
  
  return (
    <Combobox
      options={options}
      value={value}
      onChange={handleSelectChange}
      placeholder={placeholder}
      searchPlaceholder={`Search ${placeholder.toLowerCase()}...`}
      className={className}
    />
  );
}
