import { Router } from "express";

const purchasesRoutes = Router();

purchasesRoutes.post("/"); // apenas dono do carrinho pode finalizar compra, email com os dados da compra deve ser disparado para o usuário.
purchasesRoutes.get("/:id"); // apenas dono do carrinho e adm podem selecionar uma compra
purchasesRoutes.get("/"); // apenas adm pode listar todas as compras

export default purchasesRoutes;