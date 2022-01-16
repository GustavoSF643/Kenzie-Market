import { Router } from "express";
import { sendEmail } from "../controllers/EmailController";
import { sendPasswordResetToken, updatePassword } from "../controllers/PasswordController";
import { admAuth } from "../middlewares/authentication/AdmAuth";
import { schemaValidate } from "../middlewares/validate/schemaValidate";
import { emailSchema } from "../models/schema/email";
import { resetPasswordSchema } from "../models/schema/resetPassword";
import { updatePasswordSchema } from "../models/schema/updatePassword";
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
routes.use("/email", admAuth, schemaValidate(emailSchema), sendEmail);
routes.use("/recuperar", schemaValidate(resetPasswordSchema), sendPasswordResetToken);
routes.use("/alterar_senha", schemaValidate(updatePasswordSchema), updatePassword)

export default routes;
