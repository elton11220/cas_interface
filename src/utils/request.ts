import axios, { AxiosRequestConfig } from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { RequestError } from "./RequestError";

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 20,
  withCredentials: true,
});

interface ApiResult<T = any> {
  code: number;
  msg: string;
  data?: T;
}

interface ErrResult {
  code: number;
  msg: string;
}

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.headers.location) {
      window.localStorage.removeItem("redirect");
      window.location.replace(res.headers.location);
    }
    const code = res.data.code;
    const message = res.data.msg;
    if (code === 200 || code === 201) {
      window.$message.success(message);
    } else if (code === 400) {
      window.$message.error(message);
      return Promise.reject(new RequestError(res.data.msg, 400))
    } else if (code === 403) {
      window.$message.error(res.data.msg);
      return Promise.reject(new RequestError(res.data.msg, 403))
    }
    return res;
  },
  (error: AxiosError<ErrResult>) => {
    window.$message.error("请求失败");
    return Promise.reject(error);
  }
);

export default <T = null> (config: AxiosRequestConfig) => {
  return new Promise<ApiResult<T>>((resolve, reject) => {
    axiosInstance.request<ApiResult<T>>(config).then((response: AxiosResponse<ApiResult<T>>) => {
      resolve(response.data)
    }).catch((error :any) => {
      reject(error)
    })
  })
}
