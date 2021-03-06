import { Gender, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};



const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

// Function to ensure/validate that request object is of right type


// One way to do it
//type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown }
//const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => { ....}


const toNewPatient = ( object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    }
    return newPatient
}



export default toNewPatient