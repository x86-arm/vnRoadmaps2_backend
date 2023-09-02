import axios from "libs/overridedAxios";
import { genSign } from "utils/genSign"

const baseURL = "/auth";

const authServices = {
  login: (data: { username: string; password: string }) => {
    const url = baseURL + "/login";
    return axios.post(url, genSign(data));
  },
  signup: (data: { fullname: string; username: string; password: string }) => {
    const url = baseURL + "/signup";
    return axios.post(url, data);
  },
  refreshToken: (data?: { refreshToken: string }) => {
    const url = baseURL + "/refresh-token";
    return axios.post(url, data);
  },
  me: (data?: { accessToken: string }) => {
    const url = baseURL + "/me";
    return axios.post(url, {});
  },
  logout: () =>
  // data: { accessToken: string }
  {
    // document.cookie. = ""
  },
};

export default authServices;
