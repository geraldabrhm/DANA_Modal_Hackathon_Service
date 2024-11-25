import ApiClient from "../lib/ApiClient";
import { ServiceOutput } from "../types/ServiceOutput";
import { generateUUID } from "../utils/generateHeader";

export const directDebitPaymentService = async (): Promise<ServiceOutput> => {
  try {
    const payment = await ApiClient.paymentService.post(
      "/v1.0/debit/payment.htm",
      {
        partnerReferenceNo: generateUUID(),
        merchantId: process.env.PARTNER_MERCHANT_ID || "",
        amount: {
          currency: "IDR",
          value: "875000.00",
        },
        additionalInfo: {
          productCode: "", // TODO
          order: {
            orderTitle: "DANA Modal Repayment",
          },
          mcc: "", // TODO
          envInfo: { // TODO
            sessionId: "8EU6mLl5mUpUBgyRFT4v7DjfQ3fcauthcenter",
            tokenId: "a8d359d6-ca3d-4048-9295-bbea5f6715a6",
            websiteLanguage: "en_US",
            clientIp: "10.15.8.189",
            osType: "Windows.PC",
            appVersion: "1.0",
            sdkVersion: "1.0",
            sourcePlatform: "IPG",
            orderOsType: "IOS",
            merchantAppVersion: "1.0",
            terminalType: "SYSTEM",
            orderTerminalType: "WEB",
            extendInfo: '{"deviceId":"CV19A56370e8a00d54293aab8001e4794"}',
          },
        },
      }
    );

    return {
      success: true,
      message: "Success to process payment",
      data: {},
      status: payment.status,
    };
  } catch (err) {
    console.error(`[PaymentService] Failed to process payment: ${err}`);
    return {
      success: false,
      message: "Failed to process payment",
      data: null,
      status: 500,
    };
  }
};
