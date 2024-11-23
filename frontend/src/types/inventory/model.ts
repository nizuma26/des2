import { GenericValues } from "../index";

export interface ModelFormValues extends GenericValues {
    brand: number | null;
    brand_name: string;
}

export type ModelList = Omit<ModelFormValues, 'brand' | 'id'> & {
    id: number;
    brand_id: number;
    brand_name: string;
}