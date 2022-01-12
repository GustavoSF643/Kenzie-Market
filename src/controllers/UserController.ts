import { classToClass } from "class-transformer";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import { Response, Request } from "express";

import CreateUserService from "../services/User/CreateUserService";

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
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            id: request.user.id,
        }
    });

    return response.json(classToClass(user));
};
