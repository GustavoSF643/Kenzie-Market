import { Router } from "express";
import { create, list, retrieve } from "../controllers/UserController";
import { admAuth } from "../middlewares/authentication/AdmAuth";

const userRouter = Router();

userRouter.post('/', create);
userRouter.get('/:id', retrieve); // user só pode acessar seu perfil. Adm pode acessar qualquer user
userRouter.get('/', admAuth, list);

export default userRouter;