import React from "react";
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalHealthcareForm, { OccupationalHealthcareFormValues } from "./AddOccupationalHealthcareForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: ( values: OccupationalHealthcareFormValues ) => void;
    error?: string;
}

const AddOccupationalHealthcareEntryModal = ( { modalOpen, onClose, onSubmit, error }: Props ) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new Occupational healthcare entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddOccupationalHealthcareEntryModal;