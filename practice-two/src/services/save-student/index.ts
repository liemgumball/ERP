import api from '@services/api-request';
import { STUDENTS_URL } from '@constants/services';
import { StudentInputs } from 'src/types';

export const saveStudent = (inputData: StudentInputs, accessToken?: string) => {
  return inputData.id
    ? api.patch(`${STUDENTS_URL}/${inputData.id}`, inputData, accessToken)
    : api.post(`${STUDENTS_URL}`, inputData, accessToken);
};
