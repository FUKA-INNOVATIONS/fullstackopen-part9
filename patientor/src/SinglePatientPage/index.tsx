import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Diagnosis, Entry, PatientFromApi } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Segment, Button } from "semantic-ui-react";
import AddHospitalEntryModal from "../AddEntryModals/AddHospitalEntryModal";
import { HospitalEntryFormValues } from "../AddEntryModals/AddHospitalEntryModal/AddHospitalEntryForm";
import { HealthCheckFormValues } from "../AddEntryModals/AddHealthCheckEntryForm/AddHealthCheckEntryForm";
import AddHealthCheckEntryModal from "../AddEntryModals/AddHealthCheckEntryForm";
import { OccupationalHealthcareFormValues } from "../AddEntryModals/AddOccupationalHealthcareForm/AddOccupationalHealthcareForm";
import AddOccupationalHealthcareEntryModal from "../AddEntryModals/AddOccupationalHealthcareForm";

interface RouterParams {
    id: string
}

const SinglePatientPage = () => {
    // const { id } = useParams<{ id: string }>();
    const { id } = useParams<RouterParams>();
    const [ { patient }, dispatch ] = useStateValue();
    const [ { diagnoses }, dispatchDiagnoses ] = useStateValue();
    const [ refreshPatient, setRefreshPatient ] = React.useState<boolean>( false );

    const [ hospitalEntryModalOpen, setHospitalEntryModalOpen ] = React.useState<boolean>( false );
    const [ hospitalEntryError, setHospitalEntryError ] = React.useState<string | undefined>();
    const openHospitalEntryModal = (): void => setHospitalEntryModalOpen( true );
    const closeHospitalEntryModal = (): void => {
        setHospitalEntryModalOpen( false );
        setHospitalEntryError( undefined );
    };

    const [ healthCheckEntryModalOpen, setHealthCheckEntryModalOpen ] = React.useState<boolean>( false );
    const [ healthCheckEntryError, setHealthCheckEntryError ] = React.useState<string | undefined>();
    const openHealthCheckEntryModal = (): void => setHealthCheckEntryModalOpen( true );
    const closeHealthCheckEntryModal = (): void => {
        setHealthCheckEntryModalOpen( false );
        setHealthCheckEntryError( undefined );
    };

    const [ occupationalHealthcareEntryModalOpen, setOccupationalHealthcareEntryModalOpen ] = React.useState<boolean>( false );
    const [ occupationalHealthcareEntryError, setOccupationalHealthcareError ] = React.useState<string | undefined>();
    const openOccupationalHealthcareEntryModal = (): void => setOccupationalHealthcareEntryModalOpen( true );
    const closeOccupationalHealthcareEntryModal = (): void => {
        setOccupationalHealthcareEntryModalOpen( false );
        setOccupationalHealthcareError( undefined );
    };


    const submitNewOccupationalHealthcareEntry = async ( values: OccupationalHealthcareFormValues ) => {

        console.log('values 1: ', values);

        if ( values.sickLeave?.startDate.length !== 0  ) {
            console.log('sickLeave: ', values.sickLeave);
        } else {
            console.log('deleted');
            delete values.sickLeave;
        }

        console.log('values 2: ', values);

        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${ apiBaseUrl }/patients/${ id }/entries`,
                values
            );
            console.log( 'newEntry: ', newEntry );
            dispatch( { type: "ADD_ENTRY", payload: newEntry } );
            //closeHospitalEntryModal();
        } catch ( e ) {
            console.error( 'Form error: ', e.response?.data || 'Unknown Error' );
            setHospitalEntryError( e.response?.data?.error || 'Unknown error, Entry was not added. Please check form values and try again!' );
        }

        // Refresh patient details and close modal.
        console.log( 'errorState: ', healthCheckEntryError );
        setRefreshPatient( true );
        setOccupationalHealthcareEntryModalOpen( false );
    };

    const submitNewHealthCheckEntry = async ( values: HealthCheckFormValues ) => {

        // Convert healthCheckRating value to number
        // otherwise react/formik converts this value to string after changing default value and backend gives error
        values.healthCheckRating = Number(values.healthCheckRating);

        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${ apiBaseUrl }/patients/${ id }/entries`,
                values
            );
            console.log( 'newEntry: ', newEntry );
            dispatch( { type: "ADD_ENTRY", payload: newEntry } );
            //closeHospitalEntryModal();
        } catch ( e ) {
            console.error( 'Form error: ', e.response?.data || 'Unknown Error' );
            setHospitalEntryError( e.response?.data?.error || 'Unknown error, Entry was not added. Please check form values and try again!' );
        }

        // Refresh patient details and close modal.
        console.log( 'errorState: ', healthCheckEntryError );
        setRefreshPatient( true );
        setHealthCheckEntryModalOpen( false );
    };

    const submitNewHospitalEntry = async ( values: HospitalEntryFormValues ) => {

        // Remove white spaces and Convert diagnosisCodes from string array
        // Remove code duplicates
        // This can be used with text field
        /*const diagnosesLength = values.diagnosisCodes?.length;
        if ( diagnosesLength !== 0 ) {
            values.diagnosisCodes = uniq( values.diagnosisCodes?.toString().replace( /\s/g, '' ).split( ',' ) );
        } else {
            values.diagnosisCodes = [];
        }*/

        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${ apiBaseUrl }/patients/${ id }/entries`,
                values
            );
            console.log( 'newEntry: ', newEntry );
            dispatch( { type: "ADD_ENTRY", payload: newEntry } );
            //closeHospitalEntryModal();
        } catch ( e ) {
            console.error( 'Form error: ', e.response?.data || 'Unknown Error' );
            setHospitalEntryError( e.response?.data?.error || 'Unknown error, Entry was not added. Please check form values and try again!' );
        }

        // Refresh patient details and close modal.
        console.log( 'errorState: ', hospitalEntryError );
        setRefreshPatient( true );
        setHospitalEntryModalOpen( false );
    };


    const entries: Entry[] = patient.entries as Entry[];

    useEffect( () => {
        if ( patient.id !== id || refreshPatient ) {
            console.log( 'Fetching and adding Patient to app state..' );
            const fetchPatient = async () => {
                try {
                    const { data: patientFromApi } = await axios.get<PatientFromApi>(
                        `${ apiBaseUrl }/patients/${ id }`
                    );
                    dispatch( { type: "GET_PATIENT", payload: patientFromApi } );
                    setRefreshPatient( false );
                } catch ( e ) {
                    console.error( e );
                }
            };
            void fetchPatient();
        }
    }, [ refreshPatient ] );

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
    }, [ id ] );

    return (
        <>
            <p><b> { patient.name } | { patient.gender } </b></p>
            <p>SSN: { patient.ssn }</p>
            <p>Occupation: { patient.occupation }</p>
            <br/>
            <p><b>Entries</b></p>
            { entries?.map( entry => {
                return (
                    <div key={ entry.id }>
                        <p>{ entry.date }</p>
                        <p>{ entry.description }</p>
                        <ul>
                            { entry.diagnosisCodes && entry.diagnosisCodes.map( c => {
                                const diagnoseFound = diagnoses?.filter( d => d.code === c );
                                return (
                                    <li key={ c }>
                                        <b>{ c }</b> - { diagnoseFound.map( d => d.name ) }</li>
                                );

                            } ) }
                        </ul>
                    </div>
                );
            } ) }
            <div>

                <AddHospitalEntryModal
                    modalOpen={ hospitalEntryModalOpen }
                    onSubmit={ submitNewHospitalEntry }
                    error={ hospitalEntryError }
                    onClose={ closeHospitalEntryModal }
                />

                <AddHealthCheckEntryModal
                    modalOpen={healthCheckEntryModalOpen}
                    onClose={closeHealthCheckEntryModal}
                    onSubmit={submitNewHealthCheckEntry}
                    error={healthCheckEntryError}
                />

                <AddOccupationalHealthcareEntryModal
                    modalOpen={occupationalHealthcareEntryModalOpen}
                    onClose={closeOccupationalHealthcareEntryModal}
                    onSubmit={submitNewOccupationalHealthcareEntry}
                    error={occupationalHealthcareEntryError}
                />

                <Segment>
                    { hospitalEntryError &&
                    <Segment inverted color="red">{ `Hospital Entry Error: ${ hospitalEntryError }` }</Segment> }

                    <Button onClick={ () => openHospitalEntryModal() }>Add New hospital
                        entry</Button>
                    <Button onClick={ () => openHealthCheckEntryModal() }>Add New health check entry</Button>
                    <Button onClick={ () => openOccupationalHealthcareEntryModal() }>Add New hospital entry</Button>
                </Segment>
            </div>
        </>
    );
};


export default SinglePatientPage;