import crypto from "crypto";

export const generateSignature = (clientId: string, timestamp: string) => {
  const stringToSign = `${clientId}|${timestamp}`;
  const privateKey = process.env.PARTNER_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Private key is not defined");
  }

  try {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(stringToSign);
    const signature = signer.sign(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      "base64"
    );

    return signature;
  } catch (err) {
    throw new Error("Failed to generate signature");
  }
};
