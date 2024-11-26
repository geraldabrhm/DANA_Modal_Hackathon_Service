import { NextFunction, Request, Response } from "express";
import { directDebitPaymentService } from "../services/PaymentService";

export const directDebitPaymentController = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  try {
    const amount = req.body.paymentAmount;
    const response = await directDebitPaymentService(amount);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: "Failed to process payment" });
  }
};
