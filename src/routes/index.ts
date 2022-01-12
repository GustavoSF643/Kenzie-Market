import { Router } from "express";
import cartRoutes from "./CartRoutes";
import productRoutes from "./ProductRoutes";
import purchasesRoutes from "./PurchasesRoutes";
import sessionRouter from "./SessionRoutes";
import userRouter from "./UserRoutes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/login", sessionRouter);
routes.use("/product", productRoutes);
routes.use("/cart", cartRoutes);
routes.use("/buy", purchasesRoutes);
// routes.use("/email");
// routes.use("/recuperar");

export default routes;
