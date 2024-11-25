import { Request, Response, NextFunction } from "express";
import { applyTokenService } from "../services/AuthService";

export const applyTokenController = async (
  req: Request,
  res: Response,
  next?: NextFunction
) => {
  try {
    const { authCode } = req.body;
    const { success, message, data, status } =
      await applyTokenService(authCode);

    res.status(200).json({ success, message, data, status });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to apply token", data: null });
    console.error(err);
  }
};
