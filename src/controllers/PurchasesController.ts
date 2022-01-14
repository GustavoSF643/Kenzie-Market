import { getCustomRepository, getRepository } from "typeorm";
import { Response, Request } from "express";

import AddProductsOnPurchasesService from "../services/PurchaseProducts/AddProductsOnPurchasesService";
import Purchase from "../entities/Purchases";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";
import SendReportEmailService from "../services/Purchases/SendReportEmailService";
import { classToClass } from "class-transformer";

export const create = async (request: Request, response: Response) => {
    const addProductsOnPurchasesService = new AddProductsOnPurchasesService();
    const purchaseId = await addProductsOnPurchasesService.execute({
        userId: request.user.id,
    });

    const purchaseRepository = getRepository(Purchase);
    const purchase = await purchaseRepository.findOne({
        id: purchaseId,
    }, {
        relations: ["products"]
    });

    if (!purchase) {
        throw new AppError("Purchase not found");
    };
    
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });
    
    if (!user) {
        throw new AppError("User not found")
    };
    
    const sendReportEmailService = new SendReportEmailService();
    await sendReportEmailService.execute({
        name: user.name,
        email: user.email,
        purchase,
    });

    return response.status(200).json({message: "Purchase completed."});
};

export const list = async (request: Request, response: Response) => {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find();

    return response.json(classToClass(purchases));
};

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });

    if (!user || !user.isAdm && id !== request.user.id) {
        throw new AppError("Unauthorized", 401);
    }
    
    const purchaseRepository = getRepository(Purchase);
    const purchase = await purchaseRepository.find({
        where: {
            userId: id,
        }
    });

    if (!purchase) {
        throw new AppError("Purchase not found.", 404)
    };

    return response.json(classToClass(purchase));
};