import express from "express";

import  { limirRequest }  from "../src/config/pluguins/reteLimitplugins.js"
import { envs } from "./config/enviroments/enviroments.js";
import { enableCors } from "./config/pluguins/cors.plugins.js";
import { enableMorgan } from "./config/pluguins/morgan.pluguins.js";
import { setParameterPollution } from "./config/pluguins/parameterPollutionPlugins.js";
import { sanitizaterClean } from "./config/pluguins/sanitizePlugin.js";
import { headerSecurity } from "./config/pluguins/securityHelmetPlugins.js";
import { AppError } from "./error/appError.js";
import { globalErrorHandler } from "./error/error.controller.js";
import { router } from "./route/route.js";

const app = express();
const ACCEPTED_ORIGIN = ["http://localhost:8080", "http://localhost:4200"]

//me permite resivir informacion del cliente en formato json
app.use(express.json());

const limit =limirRequest(100, 60, "too many request from this IP, please try again in an hour")
const helmet = headerSecurity()
const sanitizater = sanitizaterClean();
const hpp = setParameterPollution()


//TODO: Refactorizacion
if(envs.NODE_ENV ==="development"){

    enableMorgan(app)
}
app.use(hpp())
app.use(helmet())
app.use(limit)
app.use(sanitizater)
enableCors(app, ACCEPTED_ORIGIN)

app.use("/api/v1", router);


app.all("*", (req, res, next) => {
    // return res.status(404).json({
    //     status: "error",
    //     message: `Can't find ${req.originalUrl} on this server`
    // })

    // const err = new Error(`Can't find ${req.originalUrl} on this server`)
    // err.status = "error"
    // err.statusCode = 404
    // next(err)
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// errores
app.use(globalErrorHandler);

export default app;
