import { ReactNode } from "react";

export interface AutocompleteItemsProps {
  addOrUpdate: (data: Record<string, any>) => void;
  itemIds: number[];
  adornement?: ReactNode;
}
