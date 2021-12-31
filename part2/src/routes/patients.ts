import express from 'express';
const router = express.Router();
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";


router.get( '/', ( _req, res ) => {
    res.json( patientService.getPatientsPublic() )
} );

router.get( '/:id', ( req, res ) => {
    const patientFound = patientService.getPublicPatientSingle(req.params.id);
    if (patientFound) {
        res.json( patientFound )
    } else {
        res.status(400).json({error: 'Something went wrong and patient not found!'})
    }
} );

router.post( '/:id/entries', ( req, res ) => {
    const patientId = req.params.id;
    const receivedEntry = req.body
    try {
        const newEntry = toNewEntry(receivedEntry)
        const addedEntry = patientService.addEntry(newEntry, patientId)
        res.json(addedEntry)
    } catch ( error ) {
        let errorMessage = 'Something went wrong and new entry was not added.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
} );

router.post( '/', ( req, res ) => {
    try {
        const newPatient = toNewPatient(req.body)
        const addPatient = patientService.addPatient(newPatient)
        res.json(addPatient)
    } catch ( error: unknown ) {
        let errorMessage = 'Something went wrong and new patient was not added.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
} );

export default router;