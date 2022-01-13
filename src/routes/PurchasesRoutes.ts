import { Router } from "express";
import { create, list, retrieve } from "../controllers/PurchasesController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import userAuth from "../middlewares/authentication/userAuth";

const purchasesRoutes = Router();

purchasesRoutes.post("/", userAuth, create); // email com os dados da compra deve ser disparado para o usuário.
purchasesRoutes.get("/:id", userAuth, retrieve);
purchasesRoutes.get("/", admAuth, list);

export default purchasesRoutes;