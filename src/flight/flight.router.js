import { Router } from "express";

import { protect, restrictTo } from "../auth/auth.meddlewere.js";
import { approveFlight, flightCreate, flightDelete, flightFindAll, flightFindOne, flightUpdate } from "./flight.controller.js";

export const router = Router();

router.use(protect);
router
    .route("/")
    .get(flightFindAll)
    .post(protect, restrictTo("admin", "developer"), flightCreate);

router.patch(
    "/aprove-takeoff/:id",
    restrictTo("admin", "developer"),
    approveFlight
);

router
    .route("/:id")
    .get(flightFindOne)
    .patch(restrictTo("admin", "developer"), flightUpdate)
    .delete(restrictTo("admin", "developer"), flightDelete);
