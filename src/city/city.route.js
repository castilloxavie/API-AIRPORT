import { Router } from "express";

import { protect } from "../auth/auth.meddlewere.js";
import { createCity, deleteCity, findCity, findOnecity, updateCity } from "./city.controller.js";
import { validateExisCity } from "./city.meddlewere.js";

export const router = Router();

router.use(protect)
router.route("/").get(findCity).post(createCity);

router
    .use("/:id", validateExisCity)
    .route("/:id")
    .get(findOnecity)
    .patch(updateCity)
    .delete(deleteCity);


//!NOTA= Tener encuenta que cunado se hace .use("/:id", validateExisCity)<---- meddlewere en las rutas. las rutas de hay para abajo  que no la utilicen presentaran problemas, lo recomendado es que si se va a utilizar en unas si en otras no lo mejoes e colocarlo directamenta a cada uno y no colocarlo genaral 
