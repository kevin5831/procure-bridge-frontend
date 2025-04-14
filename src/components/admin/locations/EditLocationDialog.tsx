
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LocationForm } from "./LocationForm";
import { companyService } from "@/services/company";
import { toast } from "sonner";

interface EditLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reload: boolean
  onReload:(reload: boolean) => void;
  selectedId: unknown
}

export function EditLocationDialog({ open, onOpenChange, onReload, reload, selectedId }: EditLocationDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState(null)
  const handleSubmit = async (values: unknown, id: unknown) => {
    console.log("i got here")
    setIsLoading(true);
    try{
      await companyService.putSingleLocation(values, id);
      // TODO: Implement API call to save company information
      toast.success("Location created successfully");
      onReload(true)
    } catch (error) {
      toast.error("Failed to create location");
    }finally {
      setIsLoading(false);
      onReload(true)
    }
    console.log("Creating location:", values);
    onOpenChange(false);
  };
  useEffect(()=>{
    const fetchLocationData = async () => {
      try{
        console.log("etchhhh")
        const data = await companyService.getSingleLocation(selectedId);
        setLocationData(data);
      } catch (error){
        console.error('Error fetching user details:', error);
      }
    }
    fetchLocationData()
  }, [selectedId])
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>
            Edit location or branch for your organization
          </DialogDescription>
        </DialogHeader>
        <LocationForm 
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          loading={isLoading}
          locationData={locationData}
          id={selectedId}
        />
      </DialogContent>
    </Dialog>
  );
}
