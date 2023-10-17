import { envs } from "../config/enviroments/enviroments.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";

const handleCastError22001 = () => {
    return new AppError("value too log for type attribute i database", 400)
}

const handleCastError23505 = () => {
    return new AppError("Duplicate field value: please use another value", 400)
}

const handleJWTExpiredError = () => {
    return new AppError("Your token has expiered! Please login again", 401)
}

const handleJWTError = () => {
    return new AppError("Inalid token. Please ligin again", 401)
}

const handleCastError22P02 = () => {
    return new AppError("invalid type in database", 400)
}

const sendErorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,

    })
}

const sendErrorPro = async (err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    })
    
    if (err.isOperational === true) {
        //operational, trueted error: dens message to client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        //programming or other unknow err: don't leak error detail
        console.log("Error 🧨", err);
        res.status(500).json({
            status: "fail",
            message: "Something went very wrong!"
        })
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail";

    if(envs.NODE_ENV === "development"){
        sendErorDev(err, res)
    }

    if (envs.NODE_ENV === "production") {
        let error =  err 
        if(err.parent?.code === "22001")error = handleCastError22001()
        if(err.parent?.code === "23505")error = handleCastError23505()
        if(err.parent?.code === "22P02")error = handleCastError22P02()
        if(err.name === "TokenExpiredError") error = handleJWTExpiredError()
        if(err.name === "JsonWebToken") error = handleJWTError()

        sendErrorPro(error, res)
    }
}

