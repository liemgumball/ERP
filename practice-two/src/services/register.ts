import { ERROR_MSG } from '@constants/messages';
import api from './api-request';

export const registerStudent = async <T>(data: T) => {
  try {
    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/users/register/`,
      { ...data, password: 'Student0@' }
    );

    return response;
  } catch (err) {
    switch ((err as Error).message) {
      case '404':
        throw new Error(ERROR_MSG.PROCESS_FAILED);
      default:
        throw err;
    }
  }
};
