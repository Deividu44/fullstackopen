export type NonLatinDiagnose = Omit<DiagnoseData, "latin">;

export interface DiagnoseData {
  code: string,
  name: string,
  latin?: string
};


export type PatientsGender = "male" | "female" | "other";

export type NonSsnPatient = Omit<PatientsData, "ssn">;

export interface PatientsData {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: PatientsGender,
  occupation: string
};