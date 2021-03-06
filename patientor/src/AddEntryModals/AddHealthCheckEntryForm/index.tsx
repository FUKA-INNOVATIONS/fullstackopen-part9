import React from "react";
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckFormValues } from "./AddHealthCheckEntryForm";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: ( values: HealthCheckFormValues ) => void;
    error?: string;
}

const AddHealthCheckEntryModal = ( { modalOpen, onClose, onSubmit, error }: Props ) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new health check entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddHealthCheckEntryModal;