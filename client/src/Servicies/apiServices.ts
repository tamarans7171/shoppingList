import axios from "axios";
import { API_URL } from "../Constants/routers";

export const getRequest = async (router: string) => {
  try {
    const url = API_URL + router;
    const resp = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await resp.data;

    return data;
  } catch (err) {
    throw err;
  }
};

export const postRequest = async (router: string, body = {}) => {
  try {
    const url = API_URL + router;
    const resp = await axios.post(url, body);
    return resp;
  } catch (err) {
    throw err;
  }
};

export const patchRequest = async (router: string, body = {}) => {
  try {
    const url = API_URL + router;
    const resp = await axios.patch(url, { data: body });
    return resp;
  } catch (err) {
    throw err;
  }
};

export const putRequest = async (router: string, body = {}) => {
  try {
    const url = API_URL + router;
    const resp = await axios.put(url, body); 

    return resp.data; 
  } catch (err) {
    throw err;
  }
};

export const deleteRequest = async (router: string, body = {}) => {
  try {
    const url = API_URL + router;
    const resp = await axios.delete(url, { data: body });
    return resp;
  } catch (err) {
    throw err;
  }
};