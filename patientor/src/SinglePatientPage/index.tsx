import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PatientFromApi } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

interface RouterParams {
    id: string
}

const SinglePatientPage = () => {
    // const { id } = useParams<{ id: string }>();
    const { id } = useParams<RouterParams>();
    const [{ patient }, dispatch] = useStateValue();


    useEffect(() => {
        if ( patient.id !== id ) {
            console.log('Fetching Patient..');
            const fetchPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<PatientFromApi>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    dispatch({ type: "GET_PATIENT", payload: patientFromApi });
                } catch (e) {
                    console.error(e);
                }
            };
            void fetchPatient();
        }
    }, []);

    return (
        <>
            <p><b> {patient.name} | {patient.gender} </b></p>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
        </>
    );
};


export default SinglePatientPage;