import crypto from "crypto";

export const applySha256WithPkcs1Padding = (stringToSign: string) => {
  try {
    const privateKey = process.env.PARTNER_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key is not defined");
    }

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
    throw new Error("Failed to apply encryption to generate signature");
  }
};

export const minifyAndHash = (requestBody: object) => {
  try {
    const minifiedRequestBody = JSON.stringify(requestBody);
    const sha256Hash = crypto
      .createHash("sha256")
      .update(minifiedRequestBody)
      .digest("hex");

    const hexEncoded = Buffer.from(sha256Hash, "hex").toString("hex");

    return hexEncoded.toLowerCase();
  } catch (err) {
    throw new Error("Failed to minify and hash request body");
  }
};

export const generateApplyTokenSignature = (
  clientId: string,
  timestamp: string
) => {
  try {
    const stringToSign = `${clientId}|${timestamp}`;

    const signature = applySha256WithPkcs1Padding(stringToSign);
    return signature;
  } catch (err) {
    throw new Error("Failed to generate apply token signature");
  }
};

export const generateTransactionSignature = (
  httpMethod: string,
  relativePathUrl: string,
  httpRequestBody: object,
  timestamp: string
) => {
  try {
    const minifiedAndHashedBody = minifyAndHash(httpRequestBody);

    const privateKey = process.env.PARTNER_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key is not defined");
    }

    const stringToSign = `${httpMethod}:${relativePathUrl}:${minifiedAndHashedBody}:${timestamp}`;

    const signature = applySha256WithPkcs1Padding(stringToSign);

    return signature;
  } catch (err) {
    throw new Error("Failed to generate transaction signature");
  }
};
