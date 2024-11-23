import { BaseModalProps } from '../../../types';
import { LabTestType } from '../../../types/configuration/lab-test';
import { LabTest } from '../../../types/configuration/lab-test-profile';

export type LabTestData = Omit<LabTest, 'lab_test_id' | 'price'> & {
  id: number;
  standard: number;
  emergency: number;
  affiliated: number;
  home_service: number;
  holiday: number;
  exempt?: number;
};

export interface LabTestDatatableDialogProps extends BaseModalProps {
  labTestIds: number[];
  labTestType?: LabTestType;
  addLabTest: (labTest: LabTestData) => void;
}