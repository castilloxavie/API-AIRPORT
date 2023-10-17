import z from "zod"

import { extractorValidations } from "../common/utils/extractErrorData.js"

export const passengerSchema = z.object({
    nroPassport: z.string().min(8). max(10),
    name: z.string().min(2).max(99),
    surname: z.string().min(2).max(100),
    birthdate: z.string({
        invalid_type_error: "birthdate must a correct format",
        required_error: "birthdate is required"
    }),
    gender: z.enum(['male', 'femeale', 'prefer not do say']),
    email:z.string().email(),
    create_by: z.number(),
    cel: z.string().min(5).max(25),
})

export function validatePassenger(data){
    const result = passengerSchema.safeParse(data)
    const {hasError, errorMessage, data:passengerData} = extractorValidations(result)

    return {
      hasError,
      errorMessage,
      passengerData
    }
}    
  
export function validatePartialPassenger(data){
    const result = passengerSchema.partial().safeParse(data)

    const {hasError, errorMessage, data:passengerData} = extractorValidations(result)

    return {
      hasError,
      errorMessage,
      passengerData
    }
}
  