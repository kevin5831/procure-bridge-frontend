
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect, useRef } from "react";
import type { ImpairmentFormData, MockAsset } from "../types";

interface AssetSelectProps {
  form: UseFormReturn<ImpairmentFormData>;
  assets: MockAsset[];
}

export function AssetSelect({ form, assets }: AssetSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setIsLoading(false);
    }, 300);
    
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
    asset.id.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const selectedAsset = assets.find(asset => asset.id === form.watch("assetId"));

  return (
    <FormField
      control={form.control}
      name="assetId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-base font-semibold">Select Asset</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between px-3 py-5 text-left h-auto",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? assets.find((asset) => asset.id === field.value)?.name
                    : "Search assets..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent 
              className="p-0 bg-popover"
              align="start"
              sideOffset={4}
              style={{
                width: "100%",
                zIndex: 9999
              }}
            >
              <Command className="max-h-[300px]">
                <CommandInput
                  placeholder="Search assets by name or ID..."
                  value={searchQuery}
                  onValueChange={(value) => {
                    setSearchQuery(value);
                    setIsLoading(true);
                  }}
                  className="h-11"
                />
                <CommandList>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : filteredAssets.length === 0 ? (
                    <CommandEmpty>No assets found.</CommandEmpty>
                  ) : (
                    <CommandGroup className="p-2">
                      {filteredAssets.map((asset) => (
                        <CommandItem
                          key={asset.id}
                          value={asset.id}
                          onSelect={() => {
                            form.setValue("assetId", asset.id);
                            setOpen(false);
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-accent"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === asset.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-base">{asset.name}</span>
                            <span className="text-sm text-muted-foreground">
                              ID: {asset.id} | Current Value: ${asset.currentValue.toFixed(2)}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {selectedAsset && (
            <div className="mt-2 p-4 rounded-md border bg-muted">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Book Value:</span>
                  <span className="text-sm">${selectedAsset.currentValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Asset ID:</span>
                  <span className="text-sm">{selectedAsset.id}</span>
                </div>
              </div>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
