import { BaseModalProps } from "../../../../types";

import { Affiliation } from "../../../../types/orders/affiliations";

export interface AffiliationFormDialogProps extends BaseModalProps {
  values?: Affiliation;
}
