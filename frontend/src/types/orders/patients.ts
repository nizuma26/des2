import { Dayjs } from "dayjs";
import { Affiliation } from "./affiliations";

export type Gender = 'M' | 'F';

export type PatientAffiliation = Omit<Affiliation, 'is_active' | 'id'> & {
    id: number;
}

export interface Patient {
    id: number;
    names: string;
    full_name?: string;
    last_names: string;
    email: string;
    phone_number: string;
    cedula: string;
    address: string;
    gender: Gender;
    birthdate: string;
    is_active: boolean;
    affiliations: PatientAffiliation[];
};


export type PatientFormValues = Omit<Patient, 'id' | 'image' | 'affiliations' | 'birthdate'> & {
    id?: number;
    birthdate: Dayjs | null;
    affiliations?: PatientAffiliation[];

};

export type PatientList = Omit<Patient, 'image' | 'is_active' | 'affiliations' | 'names' | 'last_names'>;