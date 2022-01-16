import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";

interface Request {
    email: string;
    token: string;
};

export default class SendTokenEmailService {
    public async execute({
        token,
        email,
    }: Request): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 2525,
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD
            }
        });

        transporter.use("compile", hbs({
            viewEngine: {
                partialsDir: path.resolve(__dirname, "..", "..", "views", "Password"),
                defaultLayout: undefined,
            },
            viewPath: path.resolve(__dirname, "..", "..", "views", "Password")
        }));

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            return 
        };

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "Reset de senha.",
            template: "token",
            context: {
                name: user.name,
                token,
                api_link: process.env.APP_API_URL,
            }
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                throw new AppError("Error while sending the email", 500)
            };

        })
    };
};