import axios from "axios";
import { baseUrl } from "./shared/baseUrl";

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
});

export default instance;
