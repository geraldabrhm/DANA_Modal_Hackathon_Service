import axios from "axios";
import { ServiceOutput } from "../types/ServiceOutput";
import ApiClient from "../lib/ApiClient";

export const applyTokenService = async (authCode: string): Promise<ServiceOutput> => {
  try {
    const response = await ApiClient.authService.post("/v1.0/access-token/b2b2c.htm", {
      grantType: "AUTHORIZATION_CODE",
      authCode: authCode,
    })

    return {
      success: true,
      message: "Success exchange auth code to access token",
      data: {
        accessToken: response.data.accessToken,
        accessTokenExpiryTime: response.data.accessTokenExpiryTime,
        refreshToken: response.data.refreshToken,
        refreshTokenExpiryTime: response.data.refreshTokenExpiryTime,
        tokenType: response.data.tokenType,
        publicUserId: response.data.additionalInfo.userInfo?.publicUserId,
      },
      status: response.status,
    };
  } catch (err) {
    console.error(`[AuthService] Failed to exchange auth code to access token: ${err}`);
    return {
      success: false,
      message: "Failed to exchange auth code to access token",
      data: null,
      status: 500,
    };
  }
}