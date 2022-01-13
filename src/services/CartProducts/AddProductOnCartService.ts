import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";
import CartProduct from "../../entities/CartProduct";
import Product from "../../entities/Product";
import AppError from "../../errors/AppError";
import CreateCartService from "../Cart/CreateCartService";

interface Request {
    userId: string;
    productId: string;
};

export default class AddProductOnCartService {
    public async execute({ userId, productId }: Request): Promise<CartProduct> {
        const cartRepository = getRepository(Cart);

        let cart = await cartRepository.findOne({
            where: {
                userId
            }
        });

        if (!cart) {
            const createCart = new CreateCartService();
    
            cart = await createCart.execute({
                userId,
            });
        }

        const productRepository = getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id: productId
            }
        });

        if (!product) {
            throw new AppError("Product Not Found.");
        }

        const cartProductRepository = getRepository(CartProduct);

        const cartProduct = cartProductRepository.create({
            cart: {
                id: cart.id
            },
            product: {
                id: product.id
            },
            price: product.price
        });
        
        await cartProductRepository.save(cartProduct);

        return cartProduct;
    };
};