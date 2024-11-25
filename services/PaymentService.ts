import ApiClient from "../lib/ApiClient";
import { ServiceOutput } from "../types/ServiceOutput";
import { generateUUID } from "../utils/generateHeader";

export const directDebitPaymentService = async (): Promise<ServiceOutput> => {
  try {
    const StandardDirectPayAcquiringProdCode = "51051000100000000001";
    const QUASI_CASH_MFI = "6050" // Member Financial Institution (MFI) for Quasi Cash

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
          productCode: StandardDirectPayAcquiringProdCode,
          order: {
            orderTitle: "DANA Modal Repayment",
          },
          mcc: QUASI_CASH_MFI,
          envInfo: {
            terminalType: "SYSTEM",
          },
        },
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
