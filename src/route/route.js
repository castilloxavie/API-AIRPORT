import { Router } from "express";

import { protect } from "../auth/auth.meddlewere.js";
import { router as authRouter } from "../auth/auth.route.js";
import { router as cityRouter } from "../city/city.route.js";
import { router as flightRouter } from "../flight/flight.router.js";
import { router as passengerRouter } from "../passenger/passenger.route.js";
import{ router as planeRouter } from "../plane/plane.router.js"

export const router = Router();

router.use("/users", authRouter);
router.use(protect)
router.use("/passengers", passengerRouter);
router.use("/city", cityRouter);
router.use("/flights", flightRouter);
router.use("/planes", planeRouter)
