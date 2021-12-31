import { DischargeType, Entry, HealthCheckRating, SickLeave } from "../types";

const isString = ( text: unknown ): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = ( date: string ): boolean => {
    return Boolean( Date.parse( date ) );
};

const parseDescription = ( description: unknown ): string => {
    if ( !description || !isString( description ) ) {
        throw new Error( 'Incorrect or missing description' );
    }
    return description;
};

const parseEmployName = ( employerName: unknown ): string => {
    if ( !employerName || !isString( employerName ) ) {
        throw new Error( 'Incorrect or missing employerName' );
    }
    return employerName;
};

const parseDate = ( date: unknown ): string => {
    if ( !date || !isString( date ) || !isDate( date ) ) {
        throw new Error( 'Incorrect or missing date: ' + date );
    }
    return date;
};

const parseSpecialist = ( specialist: unknown ): string => {
    if ( !specialist || !isString( specialist ) ) {
        throw new Error( 'Incorrect or missing specialist' );
    }
    return specialist;
};


const isHealthCheckRating = ( param: any ): param is HealthCheckRating => {
    return Object.values( HealthCheckRating ).includes( param );
};

const parseHealthCheckRating = ( healthCheckRating: unknown ): HealthCheckRating => {
    if ( !healthCheckRating || !isHealthCheckRating( healthCheckRating ) ) {
        throw new Error( 'Incorrect or missing HealthCheckRating: ' + healthCheckRating );
    }
    return healthCheckRating;
};

const isDischargeType = ( discharge: any ): DischargeType => {
    if ( !discharge || !discharge.date || !discharge.criteria || !isDate( discharge.date || isString( discharge.criteria ) ) ) {
        throw new Error( `Incorrect or missing discharge: 
        \ndischarge citeria: ${ discharge.criteria ? 'INCORRECT' : 'EMPTY' } 
        \ndischarge date: ${ discharge.date } is ${ isDate( discharge.date ) ? 'CORRECT' : 'NOT CORRECT => right date format: 2022-01-01'}` );
    }
    return discharge
}

const isSickLeaveType = ( sickLeave: any ): SickLeave => {
    if ( !sickLeave || !sickLeave.startDate || !sickLeave.endDate || !isDate( sickLeave.startDate || isDate( sickLeave.endDate ) ) ) {
        throw new Error( `Incorrect or missing sickLeave: 
        \nstartDate: ${ sickLeave.startDate } is ${ isDate( sickLeave.startDate ) ? 'CORRECT' : 'NOT CORRECT => right date format: 2022-01-01' }
        \nendDate: ${ sickLeave.endDate } is ${ isDate( sickLeave.endDate ) ? 'CORRECT' : 'NOT CORRECT => right date format: 2022-01-01' }` );
    }
    return sickLeave
}


const toNewEntry = ( object: any ): Entry => {
    const baseEntry = {
        type: object.type,
        description: parseDescription( object.description ),
        date: parseDate( object.date ),
        specialist: parseSpecialist( object.specialist ),
        diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes : []
    }
    switch ( object.type ) {
        case 'Hospital':
            return {
                id: 'not-generated-yet',
                ...baseEntry,
                discharge: isDischargeType( object.discharge )
            }
        case 'HealthCheck':
            return {
                id: 'not-generated-yet',
                ...baseEntry,
                healthCheckRating: parseHealthCheckRating( object.healthCheckRating )
            }
        case 'OccupationalHealthcare':
            return {
                id: 'not-generated-yet',
                ...baseEntry,
                employerName: parseEmployName( object.employerName ),
                sickLeave: object.sickLeave && isSickLeaveType(object.sickLeave)
            }
        default:
            throw Error( 'New entry has wrong format!' )
    }

}


export default toNewEntry