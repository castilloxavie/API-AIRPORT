import jwt from "jsonwebtoken";
import { promisify } from "util";

import { envs } from "../config/enviroments/enviroments.js";
import { AppError, catchAsync } from "../error/index.js";
import { AuthServices } from "./auth.services.js";

const authSErvices = new AuthServices();

export const protect = catchAsync(async (req, res, next) => {
    //1. obtener el token
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    //2.validar si el token existe
    if (!token) {
        return next(
            new AppError(
                "you are not logged in!, please log in to get access",
                401
            )
        );
    }

    //3. decodificar el token
    const decode = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);
    

    //4. buscar usuario  del token y validar si existe
    const user = await authSErvices.findOneByUser(decode.id);

    if (!user) {
        return next(
            new AppError("the owner of this token is not longer avilable", 401)
        );
    }

    //5. validacion de cambio de contraseña
    if(user.chagedPasswordAt){
        const chagedTimeStamp = parseInt(
            user.chagedPasswordAt.getTime() / 1000, 10
        )

        if(decode.iat < chagedTimeStamp){
            return next( new AppError("user recntly changed password!, please login again", 401))
        }
    }

    //6. adjuntar el usuario en seccion, el usuario en seccion es el dueño del token
    req.sessionUser = user
    next()

});


export const restrictTo = (...roles) => {
    return (req, res, next) =>{
        if(!roles.includes(req.sessionUser.role)){
            return next(new AppError("you do not have permission to perform action", 403))
        }
        next()
    }
}

export const protectAccountOener = (req, res, next) =>{
    const {user, sessionUser} =req
    if (user.id !== sessionUser.id) {
        return next(new AppError("you do not own this  account", 401))
    }

    next()
}

export const validateExistUser = catchAsync(async(req, res, next) =>{
    const {id} = req.params
    const user = await authSErvices.findOneByUser(id)

    if(!user){
        return next(new AppError("user not found", 404))
    }
    req.user = user
    next()
})

