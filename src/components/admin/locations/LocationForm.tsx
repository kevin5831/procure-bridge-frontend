
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const locationTypes = [
  "Head Office",
  "Regional Office",
  "Branch",
  "Warehouse",
  "Store",
];

const countries = [
  { id: "US", name: "United States" },
  { id: "CA", name: "Canada" },
  { id: "UK", name: "United Kingdom" },
  { id: "AU", name: "Australia" },
  { id: "ET", name: "Ethiopia" },
];

const citiesByCountry: { [key: string]: string[] } = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
  CA: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  UK: ["London", "Manchester", "Birmingham", "Liverpool", "Edinburgh"],
  AU: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  ET: ["Addis Ababa", "Dire Dawa", "Bahir Dar", "Hawassa", "Mekelle"],
};

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  type: z.string().min(1, "Please select a type"),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "Please select a city"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

interface LocationFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export function LocationForm({ onSubmit, onCancel }: LocationFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      type: "",
      country: "",
      city: "",
      address: "",
    },
  });

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    form.setValue("country", value);
    form.setValue("city", ""); // Reset city when country changes
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      form.reset();
      toast.success("Location created successfully");
    } catch (error) {
      toast.error("Failed to create location");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={handleCountryChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={!selectedCountry}>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCountry &&
                      citiesByCountry[selectedCountry].map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter full address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Create Location</Button>
        </div>
      </form>
    </Form>
  );
}
