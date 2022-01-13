import { Router } from "express";
import { create, destroy, list, retrieve } from "../controllers/CartController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import userAuth from "../middlewares/authentication/userAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { cartSchema } from "../models/schema/cart";

const cartRoutes = Router();

cartRoutes.post("/", schemaValidate(cartSchema), userAuth, create);
cartRoutes.get("/:id", userAuth, retrieve);
cartRoutes.get("/", admAuth, list);
cartRoutes.delete("/:product_id", userAuth, destroy)

export default cartRoutes;