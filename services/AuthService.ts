import axios from "axios";
import { ServiceOutput } from "../types/ServiceOutput";
import API_CLIENT from "../lib/ApiClient";

export const exchangeAuthCodeToAccessToken = async (authCode: string): Promise<ServiceOutput> => {
  try {
    const response = await API_CLIENT.post("/v1.0/access-token/b2b2c.htm", {
      grant_type: "authorization_code",
      code: authCode,
    });

    return {
      success: true,
      message: "Success",
      data: response.data,
      status: response.status,
    };
  } catch (err) {
    return {
      success: false,
      message: "Failed to exchange auth code to access token",
      data: null,
      status: 500,
    };
  }
}