import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import { JWT_SECRET } from "../utils/variables";

const secret: Secret = JWT_SECRET || 'secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({
        message: 'Unauthorized'
    });

    const [bearerToken] = authorization.split(' ');

    jwt.verify(bearerToken, secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
                code: 401,
                status: 'Invalid session',
                error: err.message,
            });
        }
        next();
    });
}