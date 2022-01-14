import * as yup from "yup";

export const emailSchema = yup.object().shape({
    userEmail: yup.string().email().required(),
    message: yup.string().required(),
});