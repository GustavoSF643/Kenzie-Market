import * as yup from "yup";

export const cartSchema = yup.object().shape({
    productId: yup.string().uuid().required()
});