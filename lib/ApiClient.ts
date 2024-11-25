import axios from "axios";
import { generateTimestampGMT7 } from "../utils/generateHeader";
import { generateSignature } from "../utils/encryption";

const DEFAULT_TIMEOUT = 10000;

const API_CLIENT = axios.create({
  baseURL: "https://api.sandbox.dana.id",
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "X-TIMESTAMP": generateTimestampGMT7(),
    "X-CLIENT-KEY": process.env.PARTNER_CLIENT_ID || "",
    "X-SIGNATURE": generateSignature(
      process.env.PARTNER_CLIENT_ID || "",
      generateTimestampGMT7()
    ),
  },
});

export default API_CLIENT;
