import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import PurchaseProduct from "../../entities/PurchaseProduct";
import AppError from "../../errors/AppError";
import CreatePurchaseService from "../Purchases/CreatePurchaseService";

interface Request {
    userId: string;
};

export default class AddProductsOnPurchasesService {
    public async execute({ userId }: Request): Promise<string> {
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
        for (let i = 0; i < cart.products.length; i++) {
            const purchaseProduct = purchaseProductRepository.create({
                purchase: {
                    id: purchase.id
                },
                product: {
                    id: cart.products[i].productId
                },
                price: cart.products[i].price,
            });

            await purchaseProductRepository.save(purchaseProduct);
        }
        
        await cartRepository.delete(cart.id);

        return purchase.id;
    };
};