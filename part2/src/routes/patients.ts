import express from 'express';
const router = express.Router();
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";


router.get( '/', ( _req, res ) => {
    res.json( patientService.getPatientsPublic() )
} );

router.get( '/:id', ( req, res ) => {
    const patientFound = patientService.getPublicPatientSingle(req.params.id);
    console.log('single patient in router ', patientFound)
    if (patientFound) {
        res.json( patientFound )
    } else {
        res.status(400).json({error: 'Something went wrong and patient not found!'})
    }
} );

router.post( '/', ( req, res ) => {
    try {
        const newPatientEntry = toNewPatient(req.body)
        const addPatient = patientService.addPatient(newPatientEntry)
        res.json(addPatient)
    } catch ( error: unknown ) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
} );

export default router;