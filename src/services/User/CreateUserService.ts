import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import User from "../../entities/User";
import { hash } from "bcryptjs";
import AppError from "../../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
};

export default class CreateUserService {
  public async execute({ name, email, password, isAdm }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const checkUserExists = await userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("E-mail already registered");
    };

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdm,
    });

    await userRepository.save(user);

    return user;
  }
};
