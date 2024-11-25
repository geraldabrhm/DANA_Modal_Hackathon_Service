import axios, { AxiosInstance } from "axios";
import { generateTimestampGMT7, generateUUID } from "../utils/generateHeader";
import { generateSignature } from "../utils/encryption";

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
        "X-SIGNATURE": generateSignature(
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
        "X-TIMESTAMP": generateTimestampGMT7(),
        "X-PARTNER_ID": process.env.PARTNER_CLIENT_ID || "",
        "X-EXTERNAL-ID": generateUUID(),
        "X-SIGNATURE": generateSignature(
          process.env.PARTNER_CLIENT_ID || "",
          generateTimestampGMT7()
        ),
      }
    })

    this.addRequestInterceptor();
  }

  addRequestInterceptor() {
    this.authService.interceptors.request.use()
  }

  addResponseInterceptor() {
    this.authService.interceptors.response.use()
  }
}

export default APIClient.getInstance();