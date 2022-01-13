import { Router } from "express";
import { create, list, retrieve } from "../controllers/ProductController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { productSchema } from "../models/schema/product";

const productRoutes = Router();

productRoutes.post("/", schemaValidate(productSchema), admAuth, create);
productRoutes.get("/:id", retrieve);
productRoutes.get("/", list); 

export default productRoutes;