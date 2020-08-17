import { NextFunction, Response, Request } from 'express';
import { MAX_REQUESTS,  REQUESTS_TIME_LIMIT_IN_SECONDS } from '../utils/variables';

const userRequests = new Map();

export const requestLimiter = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const bearerToken = authorization?.replace('Bearer ', '');

    if (!userRequests.has(bearerToken)) {
        userRequests.set(bearerToken, { requests: 0, date: new Date() });
    }

    const userRequest = userRequests.get(bearerToken);
    userRequest.requests += 1;
    userRequests.set(bearerToken, userRequest);

    const secondsDiff = currentDateDiffInSeconds(userRequest.date);
    if (secondsDiff > Number(REQUESTS_TIME_LIMIT_IN_SECONDS))
        userRequests.delete(bearerToken);
    
    if (userRequest.requests <= Number(MAX_REQUESTS))
        return next();
    else {
        res.status(429).json({
            message: `Rate limited ${MAX_REQUESTS} requests per token per ${Number(REQUESTS_TIME_LIMIT_IN_SECONDS) / 60} minutes.`,
        });
    }
}

const currentDateDiffInSeconds = (date: Date) => {
    const now = new Date().getTime()
    return (now - date.getTime()) / 1000;
}