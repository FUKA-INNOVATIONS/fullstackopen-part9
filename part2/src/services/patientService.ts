import patientData from '../data/patientData'
import { Patient, PublicPatient, NewPatient, PublicPatientSingle } from "../types";
import { v1 as uuid } from 'uuid';
const id = uuid()

const patients: Array<Patient> = patientData

const getPatients = (): Array<Patient> => {
    return patients
}

const getPublicPatientSingle = (id: string): PublicPatientSingle => {
    const [patientFound]  = patients.filter(p => p.id === id);
    console.log('single patient in service ', patientFound)
    return {
        ...patientFound,
        entries: []
    }
}

const addPatient = ( patient: NewPatient ): PublicPatient => {
    const newPatient = {
        id,
        ...patient
    }
    patients.push(newPatient)
    return newPatient
}

const getPatientsPublic = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};


export default {
    getPatients,
    getPatientsPublic,
    addPatient,
    getPublicPatientSingle
}