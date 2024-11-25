import { Router } from "express";
import { applyTokenController } from "../controllers/AuthController";

const AuthRoute = Router();

AuthRoute.route("/").get((req, res) => {
  res.status(200).json({ message: "Auth Endpoint!" });
})

AuthRoute.route("/").post(applyTokenController);

export default AuthRoute;
