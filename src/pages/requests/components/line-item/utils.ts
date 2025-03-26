
import { v4 as uuidv4 } from 'uuid';
import { RequestLineItem } from "../../types";

export function createDefaultLineItem(): RequestLineItem {
  return {
    id: uuidv4(),
    title: "",
    assetCategory: "IT Equipment",
    quantity: 1,
    unitCost: 0,
    itemMasterId: "",
  };
}
