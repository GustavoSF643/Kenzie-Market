import { Router } from "express";

const productRoutes = Router();

productRoutes.post("/"); // apenas adm pode cadastrar um produto
productRoutes.get("/:id"); // qualquer user pode acessar um produto pelo id
productRoutes.get("/"); // qualquer user pode listar os produtos cadastrados

export default productRoutes;