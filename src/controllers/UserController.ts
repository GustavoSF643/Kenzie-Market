import { classToClass } from "class-transformer";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { Response, Request } from "express";

import CreateUserService from "../services/User/CreateUserService";
import AppError from "../errors/AppError";

export const create = async (request: Request, response: Response) => {
    const { name, email, password, isAdm } = request.body;

    const createUser = new CreateUserService();
  
    const user = await createUser.execute({
        email,
        name,
        password,
        isAdm
    });
  
    return response.status(201).json(classToClass(user));
};

export const list = async (request: Request, response: Response) => {
    const userRepository = getCustomRepository(UserRepository);
  
    const users = await userRepository.find();
  
    return response.json(classToClass(users));
};

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });

    if (!user) {
        throw new AppError("Not found any user with this id");
    };

    if (!user.isAdm && id !== request.user.id) {
        throw new AppError("Unauthorized", 401);
    };

    return response.json(classToClass(user));
};
