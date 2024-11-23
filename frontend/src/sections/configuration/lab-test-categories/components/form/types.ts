import { BaseModalProps } from '../../../../../types';
import { LabTestCategory } from '../../../../../types/configuration/lab-test-categories';

export interface LabTestCategoryFormDialogProps extends BaseModalProps {
  values?: LabTestCategory;
}
