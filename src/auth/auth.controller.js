import { encrytedPassword, verifyPassword } from "../config/pluguins/encripted.password.plugin.js";
import generateJWT from "../config/pluguins/generate.jwt.plugins.js";
import { AppError, catchAsync } from "../error/index.js";
import { AuthServices } from "./auth.services.js";
import { validateLogin, validateRegister } from "./user.shema.js";

const authServices = new AuthServices();

export const loguin = catchAsync(async (req, res, next) => {
    const { hasError, errorMessage, userData } = validateLogin(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    //1.validar que el usario exista en bades de datos
    const user = await authServices.findOneUserByEmail(userData.email);

    if (!user) {
        return next(new AppError("This account does not exist", 404));
    }

    //2.comprobar contraseña
    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    );

    if (!isCorrectPassword) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3. se le da el acceso al usuario teniendo el cuenta token y respuesta
    const token = await generateJWT(user.id);
    return res.status(200).json({
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            role: user.role,
        },
    });
});

export const register = catchAsync(async (req, res, next) => {
    const { hasError, errorMessage, userData } = validateRegister(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const user = await authServices.createUser(userData);
    const token = await generateJWT(user.id);

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            gender: user.gender,
            role: user.role,
        },
    });
});

export const changePassword = catchAsync(async (req, res, next) => {
    //1. traerme el usuario
    const { sessionUser } = req;

    //2. traerme los datos de la req.body
    const { currentPassword, newPassword } = req.body;

    //3. validar si la contraseña actual y la nueva son iguales, si es asi enviar un error
    if (currentPassword === newPassword) {
        return next(new AppError("The password cannot be equals", 400));
    }

    //4. validar si la contraseña actual es igual a la contraseña en base de datos
    const isCorrectPassword = await verifyPassword(
        currentPassword,
        sessionUser.password
    );

    if (!isCorrectPassword) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //5. encriptar la nueva contraseña
    const hashedNewPassword = await encrytedPassword(newPassword);

    await authServices.updateUser(sessionUser, {
        password: hashedNewPassword,
        chagedPasswordAt: new Date(),
    });

    return res.status(200).json({
        message: "The user password was updated successfully",
    });
});


export const delteAccount = catchAsync(async(req, res, next) =>{
    const {user} =req
    await authServices.deleteUser(user)

    res.status(204).json(null)
})



export const deleteAccount = catchAsync(async (req, res, next) => {
    const { user } = req;

    await authServices.deleteUser(user);

    res.status(204).json(null);
});

//!TENER ENCUENTA QUE FALTA MIRAR QUE SE PUEDA PODER CAMBIAR LA CONTRASEÑA DEL USUARIO
