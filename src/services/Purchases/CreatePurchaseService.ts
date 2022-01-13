import { getRepository } from "typeorm";
import Purchase from "../../entities/Purchases";

interface Request {
    userId: string;
};

export default class CreatePurchaseService {
    public async execute({ userId }: Request): Promise<Purchase> {
        const purchaseRepository = getRepository(Purchase);

        const purchase = purchaseRepository.create({
            user: {
                id: userId,
            }
        });
        
        await purchaseRepository.save(purchase);

        return purchase;
    };
};