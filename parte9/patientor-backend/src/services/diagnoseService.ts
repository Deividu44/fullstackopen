import dataDiagnose from '../../data/diagnoses';
import { DiagnoseData, NonLatinDiagnose } from '../types';

const getAllDiagnose = (): DiagnoseData[] => {
  return dataDiagnose;
}

const getAllNonLatingDiagnose = (): NonLatinDiagnose[] => {
  return dataDiagnose.map(({ code, name }) => ({
    code, name
  }));
}

export default {
  getAllDiagnose,
  getAllNonLatingDiagnose
};
