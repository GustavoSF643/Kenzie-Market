import { getCustomRepository, getRepository } from "typeorm";
import { Response, Request } from "express";

import AddProductsOnPurchasesService from "../services/PurchaseProducts/AddProductsOnPurchasesService";
import Purchase from "../entities/Purchases";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";

export const create = async (request: Request, response: Response) => {
    const addProductsOnPurchasesService = new AddProductsOnPurchasesService();

    await addProductsOnPurchasesService.execute({
        userId: request.user.id,
    });
  
    return response.status(200).json({message: "Purchase completed."});
};

export const list = async (request: Request, response: Response) => {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find();

    return response.json(purchases);
};

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const purchaseRepository = getRepository(Purchase);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });

    if (!user || !user.isAdm && id !== request.user.id) {
        throw new AppError("Unauthorized", 401);
    }

    const purchase = await purchaseRepository.find({
        where: {
            userId: id,
        }
    });

    if (!purchase) {
        throw new AppError("Purchase not found.", 404)
    };

    return response.json(purchase);
};