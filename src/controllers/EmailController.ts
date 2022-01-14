import { Response, Request } from "express";
import SendEmailMessageService from "../services/Email/SendEmailMessageService";

export const sendEmail = async (request: Request, response: Response) => {
    const { userEmail, message } = request.body;
    
    const sendEmailMessageService = new SendEmailMessageService();
    await sendEmailMessageService.execute({
        userEmail,
        message,
    });

    return response.json({message: "Email sendded."})
}