import { State } from "./state";
import { Diagnosis, Entry, Patient, PatientFromApi } from "../types";

export type Action =
    | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
}
    | {
    type: "ADD_PATIENT";
    payload: Patient;
}
    | {
    type: "GET_PATIENT";
    payload: PatientFromApi;
}
    | {
    type: "SET_DIAGNOSIS";
    payload: Diagnosis[]
}
    | {
    type: "ADD_ENTRY";
    payload: Entry
};


export const reducer = ( state: State, action: Action ): State => {
    switch ( action.type ) {
        case "ADD_ENTRY":
            // Not working correctly
            console.log( 'patient entry updated' );
            console.log('new entry payload: ', action.payload);
            return {
                patient: {...state.patient},
                patients: state.patients,
                diagnoses: state.diagnoses
            };
        case "SET_DIAGNOSIS":
            console.log( 'patient state updated' );
            return {
                patients: state.patients,
                patient: state.patient,
                diagnoses: [ ...action.payload ]
            };
        case "GET_PATIENT":
            console.log( 'patient state updated' );
            return {
                patients: state.patients,
                patient: { ...action.payload },
                diagnoses: state.diagnoses
            };
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        ( memo, patient ) => ( { ...memo, [ patient.id ]: patient } ),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [ action.payload.id ]: action.payload
                }
            };
        default:
            return state;
    }
};
