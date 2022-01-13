import { Router } from "express";
import { create, destroy, list, retrieve } from "../controllers/CartController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import userAuth from "../middlewares/authentication/userAuth";

const cartRoutes = Router();

cartRoutes.post("/", userAuth, create);
cartRoutes.get("/:id", userAuth, retrieve);
cartRoutes.get("/", admAuth, list);
cartRoutes.delete("/:product_id", userAuth, destroy)

export default cartRoutes;