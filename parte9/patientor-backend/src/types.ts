export type NonLatinDiagnose = Omit<DiagnoseData, "latin">;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
};

export enum PatientsGender {
  Male = "male",
  Female = "female",
  Other = "other"
};

export type NonSsnPatient = Omit<PatientsData, "ssn">;

export type NewPatient = Omit<PatientsData, "id">;

export interface PatientsData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: PatientsGender,
  occupation: string
};