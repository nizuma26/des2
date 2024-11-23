import { GenericValues } from '../index';

export type TypeTax = 'General' | 'Pagos'

export interface Tax extends GenericValues {
  tax: number;
  type_tax: TypeTax;
}
