import axios from "axios";
import { generateTimestampGMT7 } from "../utils/generateHeader";

const DEFAULT_TIMEOUT = 10000;

const API_CLIENT = axios.create({
  baseURL: "https://api.sandbox.dana.id",
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "X-TIMESTAMP": generateTimestampGMT7(),
    "X-CLIENT-KEY": process.env.PARNTER,
  },
})

export default API_CLIENT;