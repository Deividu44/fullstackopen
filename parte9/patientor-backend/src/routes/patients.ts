import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPatients())
});

router.post('/', (req, res) => {

  try {
    const newPatientEntry = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) errorMessage += 'Error: ' + error.message
    res.status(400).send(errorMessage);
  }

});

export default router;
