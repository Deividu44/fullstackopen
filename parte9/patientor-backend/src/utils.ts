import { NewPatient, PatientsGender } from "./types";

const isString = (str: unknown): str is string => {
  return typeof str === 'string';
};

const isGender = (param: string): param is PatientsGender => {
  return Object.values(PatientsGender).map(v => v.toString()).includes(param)
}

const isSomething = (str: unknown): boolean => {
  return str === ''
}

const parseName = (name: unknown): string => {
  if (!isString(name) || isSomething(name)) {
    throw new Error('Incorrect or missing name: ' + name)
  };
  return name;
};

const parseDateOfBirt = (birth: unknown): string => {
  if (!isString(birth) || isSomething(birth)) {
    throw new Error('Incorrect or missing birth: ' + birth)
  };
  return birth;
};

const parseSsn = (serial: unknown): string => {
  if (!isString(serial) || isSomething(serial)) {
    throw new Error('Incorrect or missing serial: ' + serial)
  };
  return serial;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || isSomething(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation)
  };
  return occupation;
}

const parseGender = (gender: unknown): PatientsGender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender or missing: ' + gender )
  }
  return gender;
}

const toNewPatient = (object: unknown): NewPatient => {

  if(!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
      
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirt(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
    }

    return newPatient;
  }
  throw new Error('Incorrect data: Some fields are missing')
}

export default toNewPatient;
