import * as yup from "yup";

export const userSchema = yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required(),
});