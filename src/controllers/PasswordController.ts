import { Response, Request } from "express";
import { getRepository } from "typeorm";
import Token from "../entities/Token";
import AppError from "../errors/AppError";
import PasswordResetTokenService from "../services/Password/PasswordResetService";
import SendTokenEmailService from "../services/Password/SendTokenEmailService";
import UpdatePasswordService from "../services/Password/UpdatedPasswordService";

export const sendPasswordResetToken = async (request: Request, response: Response) => {
    const { email } = request.body;

    const passwordResetTokenService = new PasswordResetTokenService();
    const token = await passwordResetTokenService.execute({
        email,
    });

    const sendTokenEmailService = new SendTokenEmailService();
    await sendTokenEmailService.execute({
        token: token.token,
        email,
    });
    
    process.on('unhandledRejection', (error: any) => {
        console.log('unhandledRejection', error.message);
    });
    
    return response.json({ message: "Token sendded to your email." })
};

export const updatePassword = async (request: Request, response: Response) => {
    const { token, password, confirmation } = request.body;

    const tokenRepository = getRepository(Token);
    const findToken = await tokenRepository.findOne({
        where: {
            token,
        }
    })

    if (!findToken) {
        throw new AppError("Invalid Token.")
    };

    const updatePasswordService = new UpdatePasswordService();
    await updatePasswordService.execute({
        userId: findToken.userId,
        password,
        confirmation,
    });

    await tokenRepository.delete(findToken.id);

    return response.json({ message: "Password updated."})
}