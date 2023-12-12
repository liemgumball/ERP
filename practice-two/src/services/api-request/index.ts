type ApiMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

const request = async <T, TData>(
  path: string,
  method: ApiMethod,
  accessToken?: string,
  body?: T,
): Promise<TData> => {
  try {
    const response = await fetch(path, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return (await response.json()) as TData;
  } catch (err) {
    console.error('An error occurred in request:', err);
    throw err as Error;
  }
};

const get = async (path: string, accessToken?: string) => {
  return await request(path, 'GET', accessToken);
};

const post = async <T>(path: string, body: T, accessToken?: string) => {
  return await request(path, 'POST', accessToken, body);
};

const remove = async (path: string, accessToken?: string) => {
  return await request(path, 'DELETE', accessToken);
};

const patch = async <T>(path: string, body: T, accessToken?: string) => {
  return await request(path, 'PATCH', accessToken, body);
};

const put = async <T>(path: string, body: T, accessToken?: string) => {
  return await request(path, 'PUT', accessToken, body);
};

const api = {
  get,
  post,
  patch,
  remove,
  put,
};

export default api;
