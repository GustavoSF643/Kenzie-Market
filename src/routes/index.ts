import { Router } from "express";
import sessionRouter from "./SessionRoutes";
import userRouter from "./UserRoutes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionRouter);

export default routes;
