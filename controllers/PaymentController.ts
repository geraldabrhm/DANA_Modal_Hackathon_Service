import { NextFunction, Request, Response } from "express";

export const directDebitPaymentController = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  try {
    res.status(200).json({ message: "It is Payment Endpoint!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to process payment" });
  }
};
