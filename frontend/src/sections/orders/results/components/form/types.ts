import { BaseModalProps } from "../../../../../types";
import { LabTest, PendingOrder, ResultForm } from "../../../../../types/orders/result";
import { Parameter, SubParameter } from "../../../../../types/configuration/lab-test";

type ResultDialog = Omit<BaseModalProps, 'onSubmit'> & {
  onSubmit?: (data:ResultForm) => void;
}

export interface CaptureResultsDialogProps extends ResultDialog  {
  orderData: PendingOrder;
  labTestData: LabTest;
  defaultValues: ResultForm,
}

export interface ItemInfoProps {
  label:string;
  value: string;
  width?: number | string;
}

export interface ResultValuesProps {
  labTest: string;
  // parameters: Parameter[]
}

export interface ParameterSelected {
  parameter: Parameter | SubParameter;
  index: number;
  resultName: string,
  referenceName: string,
  normalValueName: string,
}