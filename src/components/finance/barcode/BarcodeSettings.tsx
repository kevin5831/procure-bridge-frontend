
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Barcode } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { BarcodeFormValues } from "./schema";

interface BarcodeSettingsProps {
  form: UseFormReturn<BarcodeFormValues>;
}

export function BarcodeSettings({ form }: BarcodeSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Barcode className="h-5 w-5" />
          Barcode Settings
        </CardTitle>
        <CardDescription>
          Configure barcode format and generation settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="barcodeFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode Format</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select barcode format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="code128">Code 128</SelectItem>
                  <SelectItem value="code39">Code 39</SelectItem>
                  <SelectItem value="ean13">EAN-13</SelectItem>
                  <SelectItem value="qr">QR Code</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the barcode format for asset identification
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asset ID Prefix</FormLabel>
                <FormControl>
                  <Input placeholder="AST" maxLength={5} {...field} />
                </FormControl>
                <FormDescription>
                  Prefix used for generating asset identification numbers (max 5 characters)
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="digitLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sequence Length</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={4} 
                    max={10} 
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Number of digits in the sequential part (4-10 digits)
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="autoGenerate"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Auto-Generate Barcodes</FormLabel>
                  <FormDescription>
                    Automatically generate barcodes when creating new assets
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="useCheckDigit"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Include Check Digit</FormLabel>
                  <FormDescription>
                    Add a check digit for error detection
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enableQrCodes"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable QR Codes</FormLabel>
                  <FormDescription>
                    Generate QR codes alongside barcodes
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enableRfid"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Enable RFID</FormLabel>
                  <FormDescription>
                    Enable RFID tag generation and tracking
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
