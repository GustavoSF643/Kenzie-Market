import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import PurchaseProduct from "../../entities/PurchaseProduct";
import Purchase from "../../entities/Purchases";
import AppError from "../../errors/AppError";
import CreatePurchaseService from "../Purchases/CreatePurchaseService";

interface Request {
    userId: string;
    // purchaseId: string;
};

export default class AddProductsOnPurchasesService {
    public async execute({ userId }: Request): Promise<Purchase> {
        const createPurchaseService = new CreatePurchaseService();
        const purchase = await createPurchaseService.execute({
            userId,
        });
        
        if (!purchase) {
            throw new AppError("User Purchases not found.")
        };

        const cartRepository = getRepository(Cart);
        const cart = await cartRepository.findOne({
            where: {
                userId,
            }
        });

        if (!cart) {
            throw new AppError("User cart not found.")
        };
        
        const purchaseProductRepository = getRepository(PurchaseProduct);

        cart.products.forEach(async (cardProduct) => {
            const purchaseProduct = purchaseProductRepository.create({
                purchase: {
                    id: purchase.id
                },
                product: {
                    id: cardProduct.productId
                },
                price: cardProduct.price,
            });

            await purchaseProductRepository.save(purchaseProduct);
        });

        cartRepository.delete(cart.id);

        return purchase;
    };
};