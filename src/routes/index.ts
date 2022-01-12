import { Router } from "express";
import productRoutes from "./ProductRoutes";
import sessionRouter from "./SessionRoutes";
import userRouter from "./UserRoutes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionRouter);
routes.use("product", productRoutes);

export default routes;
