import axios from "axios";

export type Api = {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, data: T) => Promise<T>;
};

export const createApiService = (baseUrl: string): Api => {
  const createUrl = (url: string) => baseUrl + url;

  const get = async <T>(url: string) => {
    const response = await axios.get<T>(createUrl(url));

    return response.data;
  };

  const post = async <T>(url: string, data: T) => {
    const response = await axios.post<T>(createUrl(url), data);

    return response.data;
  };

  return {
    get,
    post,
  };
};
