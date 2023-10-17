import { Router } from "express";

import { protect, restrictTo } from "../auth/auth.meddlewere.js";
import { planeCreate, planeDelete, planeFindAll, planeFindOne, planeUpdate } from "./plane.controller.js";

export const router = Router();


router.use(protect);
router
    .route("/")
    .get(restrictTo("receptionist", "developer", "admin"), planeFindAll)
    .post(restrictTo("developer", "admin"), planeCreate);

router.use(protect)
router.route("/").get(planeFindAll).post(planeCreate)


router
    .route("/:id")
    .get(restrictTo("receptionist", "developer", "admin"), planeFindOne)
    .patch(restrictTo("developer", "admin"), planeUpdate)
    .delete(restrictTo("developer", "admin"), planeDelete);
