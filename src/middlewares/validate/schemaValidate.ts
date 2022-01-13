import { NextFunction, Request, Response } from "express";

interface errorsInterface {
    errors: string[]
}

export const schemaValidate = (schema: any) => async (request: Request, response: Response, next: NextFunction) => {
    const resource = request.body;
    
    await schema.validate(resource, { abortEarly: false }).catch(({ errors }: errorsInterface) => {
        return response.status(400).json(errors)
    });
    
    next();
};
