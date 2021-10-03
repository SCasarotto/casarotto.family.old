import axios, { AxiosRequestConfig } from 'axios';

import { settings } from 'config/settings';

interface ApiRequestData extends AxiosRequestConfig {
  path?: string;
}
export const apiRequest = async <T>(apiData: ApiRequestData) => {
  const { path, ...rest } = apiData;
  const { API_BASE_URL, API_DEBUGGING } = settings;

  const url = API_BASE_URL + '/' + path;
  const apiConfig = { url, ...rest };
  if (API_DEBUGGING) {
    console.log(`API REQUEST - ${path}:`, apiConfig);
  }
  const response = await axios.request<T>(apiConfig);
  if (API_DEBUGGING) {
    console.log(`API RESPONSE - ${path}:`, response);
  }
  return response;
};
