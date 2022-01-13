import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import PurchaseProduct from "../../entities/PurchaseProduct";
import Purchase from "../../entities/Purchases";
import AppError from "../../errors/AppError";

interface Request {
    userId: string;
    purchaseId: string;
};

export default class AddProductsOnPurchasesService {
    public async execute({ userId, purchaseId }: Request): Promise<Purchase> {
        const purchaseRepository = getRepository(Purchase);
        const cartRepository = getRepository(Cart);

        const cart = await cartRepository.findOne({
            where: {
                userId,
            }
        });

        if (!cart) {
            throw new AppError("User cart not found.")
        };

        const purchase = await purchaseRepository.findOne({
            where: {
                id: purchaseId,
            }
        });

        if (!purchase) {
            throw new AppError("User Purchases not found.")
        };

        const purchaseProductRepository = getRepository(PurchaseProduct);

        cart.products.forEach(async (product) => {
            const purchaseProduct = purchaseProductRepository.create({
                purchases: {
                    id: purchase.id
                },
                product: {
                    id: product.id
                },
            });

            await purchaseProductRepository.save(purchaseProduct);
        });

        cartRepository.delete(cart.id);

        return purchase;
    };
};