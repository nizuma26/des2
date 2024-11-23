export type KeyValue = Record<string, any>

export interface UseTableProps <T extends KeyValue> {
  data?: Array<T>,
  defaultDebounce?: number,
  filterFields?: string[];
  defaultRowsPerPage?: number;
}