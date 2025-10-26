import axios from 'axios';
import asyncStorage from '../config/storage';
import {API_ERRORS} from '../config/labels';

const TOKEN = 'token';

const BASE_URL = 'https://contactslist.com';
let token: string | null = null;
let setToken = false;


const parsedError = (response: any) => {
  let message = response?.message || API_ERRORS.SOMETHING_UNEXPECTED;
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }
  if (response?.status === 401) {
    return Promise.reject({
      message: message || API_ERRORS.SESSION_EXPIRED,
      status: response?.status,
    });
  } else if (response?.status === 404) {
    return Promise.reject({
      message: message || API_ERRORS.RESOURCE_NOT_FOUND,
      status: response?.status,
    });
  } else {
    let errorMessage = '';
    const errorData = response?.data?.error;

    if (errorData) {
      delete errorData?.config;
      delete errorData?.stack;
      errorMessage = JSON.stringify(errorData);
    }
    return Promise.reject({
      message: errorMessage.length ? errorMessage + '. ' + message : message,
      status: response?.status,
    });
  }
};

const parseBody = (response: any) => {
  if (response && (response.data === null || response.data === undefined)) {
    return Promise.reject({message: API_ERRORS.RESOURCE_NOT_FOUND});
  }

  let exception = true;

  if (response.data && (response?.status === 200 || response?.status === 201)) {
    exception = false;
  }
  return exception ? parsedError(response) : response.data;
};

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config: any) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['content-type'] = 'application/json';
    if (setToken) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
instance.interceptors.response.use(
  (response: any) => {
    const result = parseBody(response);
    return result;
  },
  (error: any) => {
    return parsedError(error.response);
  },
);

export const api = instance;
export const privateApi = {
  post: (url: string, data: any) => {
    return new Promise((resolve, reject) => {
      asyncStorage
        .getItem(TOKEN)
        .then((result: any) => {
          token = result;
          setToken = true;
          instance
            .post(url, data)
            .then((result1: any) => {
              token = '';
              setToken = false;
              resolve(result1);
            })
            .catch((error: any) => {
              token = '';
              setToken = false;
              reject(error);
            });
        })
        .catch((error: any) => {
          token = '';
          setToken = false;
          reject(error);
        });
    });
  },
  get: (url: string) => {
    return new Promise((resolve, reject) => {
      asyncStorage
        .getItem(TOKEN)
        .then((result: any) => {
          token = result;
          setToken = true;
          instance
            .get(url)
            .then((result1: any) => {
              token = '';
              setToken = false;
              resolve(result1);
            })
            .catch((error: any) => {
              token = '';
              setToken = false;
              reject(error);
            });
        })
        .catch((error: any) => {
          token = '';
          setToken = false;
          reject(error);
        });
    });
  },
  patch: (url: string, payload: any) => {
    return new Promise((resolve, reject) => {
      asyncStorage
        .getItem(TOKEN)
        .then((result: any) => {
          token = result;
          setToken = true;
          instance
            .patch(url, payload)
            .then((result1: any) => {
              token = '';
              setToken = false;
              resolve(result1);
            })
            .catch((error: any) => {
              token = '';
              setToken = false;
              reject(error);
            });
        })
        .catch((error: any) => {
          token = '';
          setToken = false;
          reject(error);
        });
    });
  },
  delete: (url: string, payload: any) => {
    return new Promise((resolve, reject) => {
      asyncStorage.getItem(TOKEN).then((res: any) => {
        (token = res), (setToken = true);
        instance
          .delete(url, payload)
          .then((result: any) => {
            (token = ''), (setToken = false);
            resolve(result);
          })
          .catch((err: any) => {
            (token = ''), (setToken = false), reject(err);
          });
      });
    });
  },
};
