import express from 'express';
const router = express.Router();
import patientService from "../services/patientService";

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries())
});

router.post('/', (_req, res) => {
    res.send('Saving a patient!');
});

export default router;