export type ParameterType = 'text' | 'number' | 'select' | 'composite';
export type ReductionType = 'orden' | 'captura_resultados';

export interface LabTestList {
  id: number;
  abbreviation: string;
  name: string;
  category: string;
}

export interface GeneralData {
  abbreviation: string;
  name: string;
  category: number | null;
  container: number | null;
  sample: number | null;
  description: string;
  indications: string;
}

export interface ReferenceValue {
  id?: number;
  name: string;
  normal_value: string | null;
}

export interface SubParameter {
  id?: number;
  name: string;
  parameter_type: ParameterType;
  measure_unit: string;
  reference_values?: ReferenceValue[];
  options: string[];
}

export interface Parameter extends SubParameter {
  sub_parameters?: SubParameter[]
}

export interface LabTestPrices {
  id?: number;
  standard: number;
  emergency: number;
  affiliated: number;
  home_service: number;
  holiday: number;
  exempt?: number;
}

export interface LabTestItems {
  item_id: number;
  item_name: string;
  item_code: string;
  quantity: number;
  reduction_type: ReductionType;
}

export interface LabTestFormValues extends GeneralData {
  id?: number;
  parameters: Parameter[];
  items: LabTestItems[];
  prices: LabTestPrices;
}

export interface ItemsDatatableDialog {
  id: number;
  item_name: string;
  item_code: string;
  item_image?: string;
  stock: number;
  price: number;
}

export type LabTestType = 'simple' | 'perfil';

export type CostType =
  | 'standard'
  | 'emergency'
  | 'affiliated'
  | 'home_service'
  | 'exempt'
  | 'holiday';
