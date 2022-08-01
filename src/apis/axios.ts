import axios from "axios";

export const instance = axios.create({
  baseURL: "http://172.21.30.18:3000/",
  timeout: 10000,
});
