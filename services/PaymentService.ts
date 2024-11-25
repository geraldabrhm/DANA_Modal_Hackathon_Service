import ApiClient from "../lib/ApiClient";
import { ServiceOutput } from "../types/ServiceOutput";
import { generateTransactionSignature } from "../utils/encryption";
import { generateTimestampGMT7, generateUUID } from "../utils/generateHeader";

export const directDebitPaymentService = async (): Promise<ServiceOutput> => {
  try {
    const relativePathUrl = "/v1.0/debit/payment.htm";

    const StandardDirectPayAcquiringProdCode = "51051000100000000001";
    const QUASI_CASH_MFI = "6050"; // Member Financial Institution (MFI) for Quasi Cash

    const requestBody = {
      partnerReferenceNo: generateUUID(),
      merchantId: process.env.PARTNER_MERCHANT_ID || "",
      amount: {
        currency: "IDR",
        value: "875000.00",
      },
      additionalInfo: {
        productCode: StandardDirectPayAcquiringProdCode,
        order: {
          orderTitle: "DANA Modal Repayment",
        },
        mcc: QUASI_CASH_MFI,
        envInfo: {
          terminalType: "SYSTEM",
        },
      },
    };

    const timestamp = generateTimestampGMT7();
    const requestHeader = {
      "X-SIGNATURE": generateTransactionSignature(
        "POST",
        relativePathUrl,
        requestBody,
        timestamp
      ),
      "X-TIMESTAMP": timestamp,
    };

    const payment = await ApiClient.paymentService.post(
      "/v1.0/debit/payment.htm",
      requestBody,
      {
        headers: requestHeader,
      }
    );

    return {
      success: true,
      message: "Success to process payment",
      data: payment.data,
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
