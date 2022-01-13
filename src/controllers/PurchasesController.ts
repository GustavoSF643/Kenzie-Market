import { getCustomRepository, getRepository } from "typeorm";
import { Response, Request } from "express";

import CreatePurchaseService from "../services/Purchases/CreatePurchaseService";
import AddProductsOnPurchasesService from "../services/PurchaseProducts/AddProductsOnPurchasesService";
import Purchase from "../entities/Purchases";
import AppError from "../errors/AppError";
import UserRepository from "../repositories/UserRepository";

export const create = async (request: Request, response: Response) => {
    const createPurchaseService = new CreatePurchaseService();

    const purchase = await createPurchaseService.execute({
        userId: request.user.id,
    });

    const addProductsOnPurchasesService = new AddProductsOnPurchasesService();

    await addProductsOnPurchasesService.execute({
        userId: request.user.id,
        purchaseId: purchase.id,
    });
  
    return response.status(201).json(purchase);
};

export const list = async (request: Request, response: Response) => {
    const purchaseRepository = getRepository(Purchase);

    const purchases = await purchaseRepository.find();

    return response.json(purchases);
};

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const purchaseRepository = getRepository(Purchase);

    const purchase = await purchaseRepository.findOne({
        where: {
            id,
        }
    });

    if (!purchase) {
        throw new AppError("Purchase not found.", 404)
    };

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });

    if (!user || !user.isAdm && purchase.userId !== request.user.id) {
        throw new AppError("Unauthorized", 401);
    }

    return response.json(purchase);
};