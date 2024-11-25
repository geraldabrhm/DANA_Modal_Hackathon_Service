import { Request, Response, NextFunction } from 'express';

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, password } = req.body;

        // const { success, message, data, status } = await registerUser(email, name, password);

        // res.status(status).json({success, message, data});
        res.status(200).json({success: true, message: 'User registered successfully', data: {email, name}});
    } catch(err) {
        // next(err);
        console.error(err);
    }
}
