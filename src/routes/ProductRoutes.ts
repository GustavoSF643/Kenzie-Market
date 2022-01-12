import { Router } from "express";
import { create, list, retrieve } from "../controllers/ProductController";
import { admAuth } from "../middlewares/authentication/AdmAuth";

const productRoutes = Router();

productRoutes.post("/", admAuth, create);
productRoutes.get("/:id", retrieve);
productRoutes.get("/", list); 

export default productRoutes;