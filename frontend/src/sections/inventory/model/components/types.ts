import { BaseModalProps } from '../../../../types';

import { ModelFormValues } from '../../../../types/inventory/model';

export interface ModelFormDialogProps extends BaseModalProps {
  values?: ModelFormValues;
}
