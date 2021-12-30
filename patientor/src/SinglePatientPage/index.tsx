import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Entry, PatientFromApi } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

interface RouterParams {
    id: string
}

const SinglePatientPage = () => {
    // const { id } = useParams<{ id: string }>();
    const { id } = useParams<RouterParams>();
    const [ { patient }, dispatch ] = useStateValue();

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
                            return <li key={c}>{c}</li>;
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