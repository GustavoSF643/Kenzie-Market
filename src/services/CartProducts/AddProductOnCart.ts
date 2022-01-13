import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import CartProduct from "../../entities/CartProduct";
import Product from "../../entities/Product";
import AppError from "../../errors/AppError";

interface Request {
    userId: string;
    productId: string;
};

export default class AddProductOnCartService {
    public async execute({ userId, productId }: Request): Promise<Cart> {
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

        const cartProduct = await cartProductRepository.create({
            cartId: cart.id,
            productId,
        })

        await cartProductRepository.save(cartProduct);

        return cartProduct.cart;
    };
};