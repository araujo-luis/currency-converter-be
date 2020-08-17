import { Request, Response } from 'express';
import { authenticate } from '../services/LoginService'
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const token = await authenticate(username, password);
        // 7 days
        const days = 1000 * 60 * 60 * 24 * 7;
        const expires = new Date(new Date().getTime() + days)

        res.status(200).cookie('token', token, { httpOnly: true }).set({
            'expires_in': expires,
            'token_type': 'Bearer',
        }).json({
            message: 'Authenticated',
            token
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            status: 'Server Error',
            response: error.message
        })
    }
}