import { PatientsData, NonSsnPatient, NewPatient } from "../types";
import dataPatients from "../../data/patients";
import { v1 as uuid } from 'uuid';

const getAllPatients = (): PatientsData[] => {
  return dataPatients
};

const getAllNonSsn = (): NonSsnPatient[] => {
  return dataPatients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
};

const addPatient = (newPatient: NewPatient): PatientsData => {
  const patientToAdd = {
    ...newPatient,
    id: uuid()
  }
  
  dataPatients.push(patientToAdd);
  return patientToAdd;
}

export default {
  getAllPatients,
  getAllNonSsn,
  addPatient
};