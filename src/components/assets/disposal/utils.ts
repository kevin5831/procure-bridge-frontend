
import { FinancialImpact } from "./types";

// Calculate financial impact (loss/gain) from disposal
export function calculateFinancialImpact(salvageValue: string, currentValue: number): FinancialImpact {
  const salvageAmount = parseFloat(salvageValue) || 0;
  const impact = salvageAmount - currentValue;
  
  return {
    amount: impact,
    type: impact >= 0 ? "gain" : "loss"
  };
}

// Parse CSV file and convert to asset objects
export async function csvToAssets(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        if (!csv) {
          reject(new Error("Failed to read file"));
          return;
        }
        
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        const assetIdIndex = headers.indexOf('assetId');
        const assetNumberIndex = headers.indexOf('assetNumber');
        const assetNameIndex = headers.indexOf('assetName');
        const categoryIndex = headers.indexOf('category');
        const currentValueIndex = headers.indexOf('currentValue');
        const ifrsValueIndex = headers.indexOf('ifrsValue');
        const taxValueIndex = headers.indexOf('taxValue');
        
        // Check if required columns exist
        if (assetIdIndex === -1 || assetNumberIndex === -1 || assetNameIndex === -1) {
          reject(new Error("CSV is missing required columns (assetId, assetNumber, assetName)"));
          return;
        }
        
        const assets = [];
        
        // Start from index 1 to skip headers
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue; // Skip empty lines
          
          const values = line.split(',').map(value => value.trim());
          
          const asset = {
            id: values[assetIdIndex],
            assetNumber: values[assetNumberIndex],
            name: values[assetNameIndex],
            category: categoryIndex !== -1 ? values[categoryIndex] : 'Unknown',
            currentValue: currentValueIndex !== -1 ? parseFloat(values[currentValueIndex]) : 0,
            ifrsValue: ifrsValueIndex !== -1 ? parseFloat(values[ifrsValueIndex]) : undefined,
            taxValue: taxValueIndex !== -1 ? parseFloat(values[taxValueIndex]) : undefined,
            status: 'In Service',
          };
          
          assets.push(asset);
        }
        
        resolve(assets);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
}
