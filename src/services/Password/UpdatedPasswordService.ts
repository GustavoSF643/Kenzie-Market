import { getCustomRepository, getRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import Token from "../../entities/Token";
import { hash } from "bcrypt";
import AppError from "../../errors/AppError";
import User from "../../entities/User";

interface Request {
    userId: string;
    password: string;
    confirmation: string;
};

export default class UpdatePasswordService {
    public async execute({
        confirmation,
        password,
        userId,
    }: Request): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne({
            where: {
                id: userId,
            }
        });

        if (!user) {
            throw new AppError("User does not exist");
        };
        
        if (password !== confirmation) {
            throw new AppError("Password and Confirmation don't match.")
        };

        const hashedPassword = await hash(password, 8);
        
        hashedPassword ? (user.password = hashedPassword) : user.password;

        await userRepository.save(user);

        return user;
    };
};