import { Router } from "express";

const cartRoutes = Router();

cartRoutes.post("/"); // apenas usuário logado pode adicionar produto ao carrinho
cartRoutes.get("/:id"); // user pode acessar apenas seu próprio cart, adm pode acessar todos
cartRoutes.get("/"); // apenas adm pode listar todos os carrinhos.
cartRoutes.delete("/:product_id") // apenas o dono do carrinho ou adm pode remover item do carrinho

export default cartRoutes;