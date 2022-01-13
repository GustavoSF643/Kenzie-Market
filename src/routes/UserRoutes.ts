import { Router } from "express";
import { create, list, retrieve } from "../controllers/UserController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import userAuth from "../middlewares/authentication/userAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { userSchema } from "../models/schema/user";

const userRouter = Router();

userRouter.post('/', schemaValidate(userSchema), create);
userRouter.get('/:id', userAuth, retrieve);
userRouter.get('/', admAuth, list);

export default userRouter;