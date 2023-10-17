import { Router } from "express";

import  { protect } from "../auth/auth.meddlewere.js"
import { createPassenger, deletePassenger, findAllPasserger, findOnePassenger, updatePassenger } from "./passenger.controller.js";

export const router = Router();


//init feature

//!Rutas
//!endpoint 1= obtener todos los pasajeros
// app.get("/passengers", (req, res) => {
//     res.send("este enlace devolvera todos los pasajeros")
// });
router.use(protect)
router.route("/").get( findAllPasserger).post(createPassenger);

router
    .route("/:id")
    .get(findOnePassenger)
    .patch(updatePassenger)
    .delete(deletePassenger);













































// router.get("/passengers", findAllPassgers);

// //! endpoint 2= crear un pasajero
//  app.post("/passengers", (req, res) => {
//     const passenger = req.body
//      res.json(passenger)
//  })
// router.post("/passengers", createPassenger);

//! endpoint 3= obtener un pasajero por mediio del id

// app.get("/passengers/:id", (req, res) => {
//     const {id} = req.params
//     console.log(id);
//     res.json({
//         message : "obtener un pasajero por mediio del id",
//         id: id
//     })
// })
// router.get("/passengers/:id", findOnePassenger);

//! endpoint 4= actualizar la informacion de un pasajero
// app.patch("/passengers/:id", (req, res) =>{
//     const {id} = req.params;
//     res.json({
//         menssage: "actualizar la informacion de un pasajero",
//         id

//     })
// })
// router.patch("/passengers/:id", updatePassenger);

//! endpoint 5= eliminar un pasajero
// app.delete("/passengers/:id", (req, res) => {
//     const {id} = req.params
//     res.json({
//         message: "eliminar un pasajero",
//         id
//     })
// })
// router.delete("/passengers/:id", deletePassenger);

//end feature
