import { BaseModalProps } from '../../../../../types';
import { Sample } from '../../../../../types/configuration/samples';

export interface SampleFormDialogProps extends BaseModalProps {
  values?: Sample;
}
