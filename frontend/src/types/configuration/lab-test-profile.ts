import { LabTestList, LabTestPrices } from './lab-test';

export type LabTest = Omit<LabTestList, 'id' | 'category'> & {
  uuid: number;
  standard: number;
  emergency: number;
  affiliated: number;
  home_service: number;
  holiday: number;
  exempt?: number;
};

export interface LabTestProfile {
  id: number;
  abbreviation: string;
  name: string;
  category: { id: number; name: string };
  description: string;
  indications: string;
  prices: LabTestPrices;
  lab_tests: LabTest[];
}

export type LabTestProfileFormValues = Omit<LabTestProfile, 'category' | 'id'> & {
  id?: number;
  category: number | null;
};
