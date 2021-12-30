import { State } from "./state";
import { Patient, PatientFromApi } from "../types";

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
};

export const reducer = ( state: State, action: Action ): State => {
    switch ( action.type ) {
        case "GET_PATIENT":
            console.log('patient state updated');
                return {
                    patients: state.patients,
                    patient: { ...action.payload }
                };
            break;
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
