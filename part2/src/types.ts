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

/*
export type NewEntry = NewHospitalEntry | NewHealthCheckEntry | NewOccupationalHealthcareEntry;
export type NewHospitalEntry = Omit<HospitalEntry, 'diagnosisCodes'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'diagnosisCodes'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'diagnosisCodes'>
*/

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface DischargeType {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge: DischargeType
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    employerName: string;
    sickLeave?: SickLeave;

}