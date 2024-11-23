import { ParameterType, ReferenceValue } from '../configuration/lab-test';
import { User } from '../security/user';
import { Order } from './orders';
import { Patient } from './patients';

type ResultStatus =
  | 'Por procesar'
  | 'En proceso'
  | 'Procesado'
  | 'Aprobado'
  | 'Impreso'
  | 'Entregado';

export interface LabTest {
  id: number;
  lab_test: string;
  lab_test_id: number;
  status: ResultStatus;
}

export interface SubResultValues {
  id: number;
  measure_unit?: string;
  parameter?: string;
  name: string;
  result_value: string;
  parameter_type: ParameterType;
  reference_value?: string;
  normal_value?: string;
  options?: string[];
  reference_values: ReferenceValue[];
}

export interface CaptureValues extends SubResultValues {
  sub_parameters?: SubResultValues[];
}

export interface SubValues {
  id: number;
  result?: number;
  measure_unit: string;
  parameter: string;
  result_value: string;
  parameter_type: ParameterType;
  normal_value: string;
  reference_value: string;
}

export interface ResultValues extends SubValues {
  sub_values?: SubValues[];
}

export interface Result {
  code: string;
  order: Order;
  lab_test: string;
  user: User;
  status: ResultStatus;
  result_date: string;
  hour: string;
  observation?: string;
  result_values: ResultValues[];
}

export interface ResultForm {
  id?: number;
  order: number;
  lab_test: number;
  status: ResultStatus;
  observation: string;
  result_values: CaptureValues[];
}

export interface PendingOrder {
  id: number;
  code: string;
  patient: Patient;
  order_date: string;
  patient_number: string;
  order_detail: LabTest[];
}
