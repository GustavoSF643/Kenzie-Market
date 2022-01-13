import { getRepository } from "typeorm";
import Cart from "../../entities/Cart";

interface Request {
    userId: string;
};

export default class CreateCartService {
    public async execute({ userId }: Request): Promise<Cart> {
        const cartRepository = getRepository(Cart);

        const cart = cartRepository.create({
            user: {
                id: userId,
            }
        });
        
        await cartRepository.save(cart);

        return cart;
    };
};