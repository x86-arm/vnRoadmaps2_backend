import axios, { AxiosError, AxiosResponse } from "axios";
import configs from "configs";

const baseURL = configs.apiURL,
  isServer = typeof window === "undefined";

axios.defaults.withCredentials = true;

axios.defaults.baseURL = baseURL;

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import("next/headers"),
      token = cookies().get("accessToken")?.value;

    if (token) {
      config.headers["Authorization"] = `JWT ${token}`;
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (token) {
      config.headers["Authorization"] = `JWT ${token}`;
    }
  }

  return config;
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data.data;
  },
  async (error: AxiosError) => {
    if (
      error.response?.status !== 401 ||
      error.config?.url?.includes("/login") ||
      error.config?.url?.includes("/signup")
    ) {
      const errMessage = error.response?.data || error?.response || error;
      return Promise.reject(errMessage);
    }
  }
);

export default axios;
