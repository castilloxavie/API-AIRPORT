import z from "zod"

import { extractorValidations } from "../common/utils/extractErrorData.js"

export const cityShema = z.object({
    name: z.string().min(5).max(50),
    country: z.string().min(5).max(50),
    lat: z.number(),
    lon: z.number(),
})

export function validateCity(data) {
    const result = cityShema.safeParse(data)
    const {hasError, errorMessage, data: cityData} = extractorValidations(result)

    return {
        hasError,
        errorMessage,
        cityData
    }
}

export function validatePartialCity(data){
    const result = cityShema.partial().safeParse(data)
    const {hasError, errorMessage, data:cityData} = extractorValidations(result)

    return {
        hasError,
        errorMessage,
        cityData
    }
}