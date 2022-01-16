import nodemailer from "nodemailer";
import path from "path";
import AppError from "../../errors/AppError";
import hbs from "nodemailer-express-handlebars";
import Purchase from "../../entities/Purchases";
import { classToClass } from "class-transformer";

interface Request {
    name: string;
    email: string;
    purchase: Purchase;
};

export default class SendReportEmailService {
    public async execute({
        name,
        email,
        purchase,
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
                partialsDir: path.resolve(__dirname, "..", "..", "views", "Purchase"),
                defaultLayout: undefined,
            },
            viewPath: path.resolve(__dirname, "..", "..", "views", "Purchase")
        }));

        const mailOptions = {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: "Relátorio de compras",
            template: "report",
            context: {
                name,
                products: classToClass(purchase).products.map((purchaseProduct) => {
                    const product = {
                        product: {
                            name: purchaseProduct.product.name,
                            description: purchaseProduct.product.description
                        },
                        price: Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(purchaseProduct.product.price),
                    }
                    return product;
                }),
                subtotal: Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                }).format(classToClass(purchase).getSubtotal())
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