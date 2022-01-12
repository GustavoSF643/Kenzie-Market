import { classToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { Response, Request } from "express";

import Product from "../entities/Product";
import CreateProductService from "../services/Product/CreateProductService";

export const create = async (request: Request, response: Response) => {
    const { name, price, description } = request.body;

    const createProduct = new CreateProductService();
  
    const product = await createProduct.execute({
        name,
        price,
        description,
    });
  
    return response.status(201).json(product);
};

export const list = async (request: Request, response: Response) => {
    const productRepository = getRepository(Product);
  
    const products = await productRepository.find();
  
    return response.json(products);
};

export const retrieve = async (request: Request, response: Response) => {
    const { id } = request.params;

    const productRepository = getRepository(Product);
    const user = await productRepository.findOne({
        where: {
            id,
        }
    });

    return response.json(user);
};