import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import Token from "../../entities/Token";
import crypto from "crypto";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";

interface Request {
    email: string;
};

export default class PasswordResetTokenService {
    public async execute({
        email,
    }: Request): Promise<Token> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User does not exist");
        };

        const tokenRepository = getRepository(Token);
        const token = await tokenRepository.findOne({
            where: {
                userId: user.id
            }
        })
        
        if (token) {
            await tokenRepository.delete(token.id);
        };
        
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await bcrypt.hash(resetToken, 8);
        
        const newToken = tokenRepository.create({
            userId: user.id,
            token: hash,
        });
        
        await tokenRepository.save(newToken);

        return newToken;
    };
};