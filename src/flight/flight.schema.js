import z from "zod";

import { extractorValidations } from "../common/utils/extractErrorData.js";

export const flightSchema = z.object({
    originId: z.number().positive(),
    detinationId: z.number().positive(),
    plaintId: z.number().positive(),
    departureTime: z.string({
        invalid_type_error: "departure time must a correct format",
        required_error: "departure time is required",
    }),
    checkIn: z.date({
        invalid_type_error: "check in must a correct format",
        required_error: "check in is required",
    }).optional(),
    status: z.enum(["pending", "inProgress", "done", "cancelled", "delayed"]),
});

export function validateFight(data) {
    const result = flightSchema.safeParse(data);
    const {
        hasError,
        errorMessage,
        data: flightData,
    } = extractorValidations(result);

    return {
        hasError,
        errorMessage,
        flightData,
    };
}

export function validatePartialFlight(data) {
    const result = flightSchema.partial().safeParse(data);
    const {
        errorMessage,
        hasError,
        data: flightData,
    } = extractorValidations(result);

    return {
        hasError,
        errorMessage,
        flightData,
    };
}
