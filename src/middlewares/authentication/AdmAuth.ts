import config from "../../config/auth";
import jwt, { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import AppError from "../../errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import auth from "../../config/auth";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export const admAuth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Missing authorization headers", 401);
    };

    try {
        const [, token] = authHeader.split(" ");
        const { secret } = auth.jwt;
    
        const decoded = verify(token, secret);
        const { sub } = decoded as TokenPayload;

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({
            where: {
                id: sub,
            },
        });

        if (!user) {
            throw new AppError("Not found any user with this id");
        }

        if (!user.isAdm) {
            throw new AppError("Unauthorized", 401);
        }
    
        request.user = {
          id: sub,
        };
    
        return next();
    } catch (err) {
        throw new AppError("JWT Expired or sended in a wrong way");
    };
};
