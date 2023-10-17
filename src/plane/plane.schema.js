import z from "zod"

import { extractorValidations } from "../common/utils/extractErrorData.js"

export const planeSchema = z.object({
    planeNumber: z.number({
        invalid_type_error:"plane must be a numbers only",
        required_error: "plane number is required"
    }),
    model: z.string().min(5).max(20),
    maxCapacity: z.number().positive(),
    arline: z.enum(["AeroGlobe",
    "AeroTronix",
    "VelocityAir",
    "AirQuest",
    "StartLink"])
})

export function validatePlane(data){
    const resutl = planeSchema.safeParse(data)

    const {hasError, errorMessage, data: planeData} = extractorValidations(resutl)

    return {
        hasError,
        errorMessage,
        planeData
    }
}


export function validatePartialPlane(data){
    const result = planeSchema.partial().safeParse(data)

    const {hasError, errorMessage, data:planeData} = extractorValidations(result)

    return {
        hasError,
        errorMessage,
        planeData
    }
}