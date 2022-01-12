import { Router } from "express";

const userRouter = Router();

userRouter.post('/');
userRouter.get('/:id'); // user só pode acessar seu perfil. Adm pode acessar qualquer user
userRouter.get('/'); // apenas adm

export default userRouter;