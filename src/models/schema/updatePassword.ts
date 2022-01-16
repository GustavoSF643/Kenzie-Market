import * as yup from "yup";

export const updatePasswordSchema = yup.object().shape({
    token: yup.string().required(),
    password: yup.string().required(),
    confirmation: yup.string().required(),
});