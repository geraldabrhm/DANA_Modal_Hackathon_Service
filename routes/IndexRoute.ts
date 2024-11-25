import { Router, Request, Response } from "express";

const IndexRoute = Router();

IndexRoute
    .route('/')
    .get((req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'Welcome to the DANA Modal API Service',
            data: {
                endpoints: [
                    {
                        path: '/auth',
                        description: 'Handles OAUTH 2.0 Authentication',
                    },
                ]
            }
        });
    })

export default IndexRoute;