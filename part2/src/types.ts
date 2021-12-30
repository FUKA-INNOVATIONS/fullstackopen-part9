export interface Diagnose {
    code: string,
    name: string
    latin?: string
}

//export type Gender = 'male' | 'female';
export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type PublicPatientSingle = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries?: Entry[]
}
