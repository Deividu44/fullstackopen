import { PatientsData, NonSsnPatient } from "../types";
import dataPatients from "../data/patients";

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

export default {
  getAllPatients,
  getAllNonSsn
};