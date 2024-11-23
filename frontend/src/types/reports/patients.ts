import { Patient } from '../orders/patients';

export type PatientTreated = Pick<
  Patient,
  'id' | 'full_name' | 'birthdate' | 'cedula' | 'gender' | 'phone_number'
> & {
  order_date: string;
  hour: string;
};
