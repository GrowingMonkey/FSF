import axios from "axios";
import { toPurifiedJson } from "../utils/PurifyJson";

let request = axios.create({
  // baseURL: "http://101.35.152.221/api/fsfa",
  // baseURL: "http://192.168.1.4:9090/fsfa/",
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

request.interceptors.request.use(
  (config) => {
    const { url } = config;
    if (url.startsWith("/login/getToken")) {
      console.log("getting token");
    } else {
      let token = window.localStorage.getItem("token");
      config.headers.token = token;
    }
    config.data = toPurifiedJson(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

// request.interceptors.response.use(
//   (response) => {
//     if (response.data.code === 2 || response.data.code === -2) {
//       console.log("to login");
//     }
//     if (response.data.code === 0) {
//       return Promise.resolve(response.data.data);
//     }
//   },
//   (error) => {
//     return Promise.reject(error.response);
//   }
// );

export default request;
