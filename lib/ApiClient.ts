import axios, { AxiosInstance } from "axios";
import { generateTimestampGMT7, generateUUID } from "../utils/generateHeader";
import {
  generateApplyTokenSignature,
  generateTransactionSignature,
} from "../utils/encryption";

class APIClient {
  static INSTANCE: APIClient;
  static DEFAULT_TIMEOUT = 10000;

  authService: AxiosInstance;
  paymentService: AxiosInstance;

  static getInstance() {
    if (!APIClient.INSTANCE) {
      APIClient.INSTANCE = new APIClient();
    }
    return APIClient.INSTANCE;
  }

  constructor() {
    this.authService = axios.create({
      baseURL: "https://api.sandbox.dana.id",
      timeout: APIClient.DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        "X-TIMESTAMP": generateTimestampGMT7(),
        "X-CLIENT-KEY": process.env.PARTNER_CLIENT_ID || "",
        "X-SIGNATURE": generateApplyTokenSignature(
          process.env.PARTNER_CLIENT_ID || "",
          generateTimestampGMT7()
        ),
      },
    });

    this.paymentService = axios.create({
      baseURL: "https://api.sandbox.dana.id",
      timeout: APIClient.DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        "X-PARTNER-ID": process.env.PARTNER_CLIENT_ID || "",
        "X-EXTERNAL-ID": generateUUID(),
        "CHANNEL-ID": process.env.SERVER_ID || "",
      },
    });

    this.addRequestInterceptor();
  }

  addRequestInterceptor() {
    this.authService.interceptors.request.use(); // TODO
  }

  addResponseInterceptor() {
    this.authService.interceptors.response.use(); // TODO
  }
}

export default APIClient.getInstance();
