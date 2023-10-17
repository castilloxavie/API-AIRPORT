import  express  from "express";

import { changePassword, delteAccount, loguin, register } from "./auth.controller.js";
import { protect, protectAccountOener, restrictTo, validateExistUser } from "./auth.meddlewere.js";

export const router = express.Router()

router.post("/login", loguin)

router.post("/register",protect, restrictTo("developer"),  register)

router.patch("/change-password",protect, changePassword)

router.delete("/:id",protect, validateExistUser, protectAccountOener, delteAccount)


