export interface LaboratoryList {
    id: number;
    code?: string;
    name: string;
    document: string;
    email: string;
    is_main: boolean;
    is_active: boolean;
    logo: string;
    get_logo: string;
}

type LaboratoryFields = Omit<LaboratoryList, 'id' | 'logo' | 'get_logo'>

export interface Laboratory extends LaboratoryFields {
    id?: number;
    local_phone: number | null;
    mobile_phone: number | null;
    manager: string;
    cedula: number | null;
    address: string;
    description: string;
    logo: File | string | null;
}
  
  export interface LaboratoryRetrieve extends LaboratoryFields {
    id?: number;
    local_phone: number | null;
    mobile_phone: number | null;
    manager: string;
    cedula: number | null;
    address: string;
    description: string;
    logo: string | null
  }

export type LaboratoryDataForReporting = Pick<LaboratoryRetrieve, 'name' | 'document' | 'address'> & {
  get_logo: string;
  email?: string;
}
