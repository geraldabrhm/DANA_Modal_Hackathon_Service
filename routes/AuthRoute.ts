import { Router } from "express";
import { applyTokenController } from "../controllers/AuthController";
import { json } from "stream/consumers";

const AuthRoute = Router();

AuthRoute.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello, Auth!" });
})

AuthRoute.route("/").post(applyTokenController);

export default AuthRoute;
