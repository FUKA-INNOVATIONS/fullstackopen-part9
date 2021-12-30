import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Diagnosis, Entry, PatientFromApi } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

interface RouterParams {
    id: string
}

const SinglePatientPage = () => {
    // const { id } = useParams<{ id: string }>();
    const { id } = useParams<RouterParams>();
    const [ { patient }, dispatch ] = useStateValue();
    const [ { diagnoses }, dispatchDiagnoses ] = useStateValue();


    const entries: Entry[] = patient.entries as Entry[];

    useEffect( () => {
        if ( patient.id !== id ) {
            console.log( 'Fetching and adding Patient to app state..' );
            const fetchPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<PatientFromApi>(
                        `${ apiBaseUrl }/patients/${ id }`
                    );
                    dispatch( { type: "GET_PATIENT", payload: patientFromApi } );
                } catch ( e ) {
                    console.error( e );
                }
            };
            void fetchPatient();
        }
    }, [] );

    useEffect( () => {
            console.log( 'Fetching and adding Diagnoses to app state..' );
            const fetchDiagnoses = async () => {
                try {
                    const { data: diagnoses } = await axios.get<Diagnosis[]>(
                        `${ apiBaseUrl }/diagnoses`
                    );
                    dispatchDiagnoses( { type: "SET_DIAGNOSIS", payload: diagnoses } );
                } catch ( e ) {
                    console.error( e );
                }
            };
            void fetchDiagnoses();
    }, [id] );

    return (
        <>
            <p><b> { patient.name } | { patient.gender } </b></p>
            <p>SSN: { patient.ssn }</p>
            <p>Occupation: { patient.occupation }</p>
            <br/>
            <p><b>Entries</b></p>
            {entries?.map( entry => {
                return (
                    <div key={ entry.id }>
                        <p>{ entry.date }</p>
                        <p>{ entry.description }</p>
                        <ul>
                        {entry.diagnosisCodes && entry.diagnosisCodes.map(c => {
                            const diagnoseFound = diagnoses?.filter(d => d.code === c);
                            return (
                                <li key={c}><b>{c}</b> - {diagnoseFound.map(d => d.name)}</li>
                            );

                        }) }
                        </ul>
                    </div>
                );
            } ) }
            <div>
            </div>
        </>
    );
};


export default SinglePatientPage;