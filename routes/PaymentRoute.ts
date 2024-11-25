import { Router } from "express";
import { directDebitPaymentController } from "../controllers/PaymentController";

const PaymentRoute = Router();

PaymentRoute.route("/").get((req, res) => {
  res.status(200).json({ message: "Payment Endpoint!" });
})

PaymentRoute.route("/").post(directDebitPaymentController);

export default PaymentRoute;