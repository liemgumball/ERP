import { ERROR_MSG } from '@constants/messages';
import { DATABASE_RESOURCES } from '@constants/services';
import { apiRequest } from '@services/apiRequest';

type LoginResponse = {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type LoginBody = {
  email: string;
  password: string;
};

/**
 * login request
 * @param email to login
 * @param password to login
 * @returns login response or error if response is not ok
 */
export const login = async (email: string, password: string) => {
  try {
    return (await apiRequest<LoginBody>(
      `${process.env.API_GATEWAY}/${DATABASE_RESOURCES.LOGIN}`,
      'POST',
      {
        email: email,
        password: password,
      }
    )) as LoginResponse;
  } catch (err) {
    if ((err as Error).message === '400')
      return new Error(ERROR_MSG.WRONG_EMAIL_OR_PASSWORD);

    return new Error('Process got failed');
  }
};
