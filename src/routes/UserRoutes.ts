import { Router } from "express";
import { create, list, retrieve } from "../controllers/UserController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import userAuth from "../middlewares/authentication/userAuth";

const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/:id', userAuth,retrieve);
userRouter.get('/', admAuth, list);

export default userRouter;