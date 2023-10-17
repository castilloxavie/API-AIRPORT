import rateLimit from "express-rate-limit";

export const limirRequest = (maxRequest, windowMInutes, message) => {
    return rateLimit({
        max: maxRequest,
        windowMs: windowMInutes * 60 * 100,
        message: message
    })
}