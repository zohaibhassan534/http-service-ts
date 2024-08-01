import axios from "axios";
import Storage from "./storageService";

const API = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const expectedError =
      error.response?.status >= 400 && error.response?.status < 500;

    if (!expectedError) {
      console.log("Unexpected error occured");
    }

    if (error.response?.status === 401) {
      Storage.clearJWTToken();
      // window.location = "/login";
      // everything what you want to do on 401
    }

    return Promise.reject(error);
  }
);

const fetch = async ({ path, csrf }) => {
  try {
    let headers = {};
    if (csrf) headers = { ...csrf };
    const res = await API.get(path, { headers });
    return res;
  } catch (ex) {
    throw ex;
  }
};

const post = async ({ path, data, csrf }) => {
  try {
    let headers = {};
    if (csrf) headers = { ...csrf };
    return await API.post(path, data, { headers });
  } catch (ex) {
    throw ex;
  }
};

const put = async ({ path, data, csrf }) => {
  try {
    let headers = {};
    if (csrf) headers = { ...csrf };
    return await API.put(path, data, { headers });
  } catch (ex) {
    throw ex;
  }
};

const dell = async ({ path, csrf }) => {
  try {
    let headers = {};
    if (csrf) headers = { ...csrf };
    return await API.delete(path, { headers });
  } catch (ex) {
    throw ex;
  }
};

const patch = async ({ path, data, csrf }) => {
  let headers = {};
  if (csrf) headers = { ...csrf };
  return await API.patch(path, data, { headers });
};

export default {
  post,
  dell,
  fetch,
  patch,
  put,
};
