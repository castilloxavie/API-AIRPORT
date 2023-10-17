import z from "zod";

import { extractorValidations } from "../common/utils/extractErrorData.js";

const registerUserSchema = z.object({
    fullname: z
        .string()
        .min(3, { message: "name is too short" })
        .max(199, { message: "name is too long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "password is too short" })
        .max(16, { message: "password is too long" }),
    role: z.enum(["receptionist", "admin", "developer", "manager", "user"]),
    gender: z.enum(["male", "female", "perfer not to say"])
});


const loginUserShema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
        .string()
        .min(8, { message: "password is too short" })
        .max(16, { message: "password is too long" }),
})


export const validateRegister = data =>{
    const result = registerUserSchema.safeParse(data)
    const {hasError, errorMessage, data:userData} = extractorValidations(result)

    return {
        hasError,
        errorMessage,
        userData
    }
}

export const validateLogin = data => {
    const result = loginUserShema.safeParse(data)
    const {hasError, errorMessage, data:userData} = extractorValidations(result)

    return {
        hasError,
        errorMessage,
        userData
    }
}