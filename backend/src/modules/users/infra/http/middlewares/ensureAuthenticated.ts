import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from '@shared/errors/AppError';

interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;

}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        throw new AppError('invalid JWT token', 401);
    }
    
    const [, token] = authHeader.split(' ');
    
    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as tokenPayload;

        req.user = {
            id: sub,
        }

        return next();
    }catch {
        throw new AppError('invalid JWT token', 401);
    }
};
