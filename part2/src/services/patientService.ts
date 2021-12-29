import patientData from '../data/patientData'
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid';
const id = uuid()

const patients: Array<PatientEntry> = patientData

const getEntries = (): Array<PatientEntry> => {
    return patients
}

const addEntry = ( patient: NewPatientEntry ): NonSensitivePatientEntry => {
    const newPatientEntry = {
        id,
        ...patient
    }
    patients.push(newPatientEntry)
    return newPatientEntry
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry
}