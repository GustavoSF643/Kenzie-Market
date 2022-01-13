import { DeleteResult, getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import CartProduct from "../../entities/CartProduct";
import Product from "../../entities/Product";
import AppError from "../../errors/AppError";

interface Request {
    userId: string;
    productId: string;
};

export default class AddProductOnCartService {
    public async execute({ userId, productId }: Request): Promise<DeleteResult> {
        const cartRepository = getRepository(Cart);

        const cart = await cartRepository.findOne({
            where: {
                userId
            }
        });

        if (!cart) {
            throw new AppError("User Cart Not Found.");
        }

        const productRepository = getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                productId
            }
        });

        if (!product) {
            throw new AppError("Product Not Found.");
        }

        const cartProductRepository = getRepository(CartProduct);

        const cartProduct = await cartProductRepository.findOne({
            where: {
                cartId: cart.id,
                productId,
            }
        });

        if (!cartProduct) {
            throw new AppError("Product not found in cart.") 
        };

        return cartProductRepository.delete(cartProduct.id)
    };
};