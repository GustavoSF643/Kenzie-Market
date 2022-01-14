import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";

interface Request {
    userEmail: string;
    message: string;
};

export default class SendEmailMessageService {
    public async execute({
        userEmail,
        message,
    }: Request): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "28cf994a06e651",
              pass: "311d4f2026e8c2"
            }
        });

        transporter.use("compile", hbs({
            viewEngine: {
                partialsDir: path.resolve(__dirname, "..", "..", "views", "Email"),
                defaultLayout: undefined,
            },
            viewPath: path.resolve(__dirname, "..", "..", "views", "Email")
        }));

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(userEmail);
        
        if (!user) {
            throw new AppError("user not found.")
        }

        const mailOptions = {
            from: "entrega14@mail.com.br",
            to: userEmail,
            subject: "Messagem para o usuário",
            template: "message",
            context: {
                name: user.name,
                message,
            }
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new AppError("Error while sending the email", 500)
            };

            console.error(error);
        })
    };
};