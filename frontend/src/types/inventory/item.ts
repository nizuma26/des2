export interface ItemList {
  id: number;
  code: string;
  name: string;
  item_type: string;
  image: string | null;
  category: { id: number; name: string };
  brand: { id: number | null; name: string };
  model: { id: number | null; name: string };
  is_active: boolean;
}

export interface ItemFormValue {
  id?: number;
  name: string;
  item_type?: string;
  description: string;
  image: File | null | string;
  is_active: boolean;
  with_tax: boolean;
  is_inventoriable: boolean;
  use_in_tests: boolean;
  category: number | null;
  measure_unit: number | null;
  model: number | null;
}

interface Generic {
  id: number;
  name: string;
}

interface Model extends Generic {
  brand: string
}

export type Item = Omit<ItemFormValue, 'id' | 'image' | 'category' | 'brand' | 'model' | 'measure_unit'> & {
  id: number;
  code: string;
  image: string | null;
  category: Generic;
  measure_unit: Generic;
  brand: string;
  model: Model;
  description: string;
  is_active: boolean;
  serial_number: boolean;
  lot_number: boolean;
  is_inventoriable: boolean;
  use_in_tests: boolean;
}

export interface ItemSearch {
  id: number;
  code: string;
  name: string;
  category: string;
  brand: string;
  model: string;
}

export interface ItemInventory {
  id: number;
  code: string;
  name: string;
  image: string | null;
  category: string;
  measure_unit: string;
  description: string;
  is_inventoriable: boolean;
  with_tax: boolean;
  stock?: number;
  price?: number;
}

export interface StockItem {
  id: number;
  item_code: string;
  item_name: string;
  item_image: string | null;
  item_category: string;
  item_measure_unit_id: number;
  item_measure_unit_name: string;
  description: string;
  serial_number: boolean;
  lot_number: boolean;
  is_inventoriable: boolean;
  use_in_tests: boolean;
  stock?: number;
  cost_bs: number;
}
