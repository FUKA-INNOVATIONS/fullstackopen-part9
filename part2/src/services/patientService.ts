import patientData from '../data/patientData'
import { Patient, PublicPatient, NewPatient, PublicPatientSingle, Entry } from "../types";
import { v1 as uuid } from 'uuid';


const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
    return patients;
}

const getPublicPatientSingle = ( id: string ): PublicPatientSingle => {
    const [ patientFound ] = patients.filter( p => p.id === id );
    return patientFound;
}

const addEntry = ( newEntry: Entry, patientId: string ): Entry | null => {
    const [ patientFound ] = patients.filter( p => p.id === patientId );
    newEntry.id = uuid();
    if ( patientFound ) {
        newEntry = {
            ...newEntry
        }
        patientFound.entries?.push( newEntry );
        return newEntry;
    } else {
        return null;
    }
}

const addPatient = ( patient: NewPatient ): PublicPatient => {
    const id = uuid()
    const newPatient = {
        id,
        entries: [],
        ...patient
    }
    patients.push( newPatient )
    return newPatient
}

const getPatientsPublic = (): PublicPatient[] => {
    return patients.map( ( { id, name, dateOfBirth, gender, occupation } ) => ( {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    } ) );
};


export default {
    getPatients,
    getPatientsPublic,
    addPatient,
    getPublicPatientSingle,
    addEntry
}