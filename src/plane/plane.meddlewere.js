import { AppError, catchAsync } from "../error/index.js";
import { PlaneServices } from "./plane.services.js"

const planeSErvices = new PlaneServices

 export const validatePlane = catchAsync(async (req, res, next) => {
    const {id}= req.params
    const plane = await planeSErvices.findOnePlane(id)

    if(!plane){
        return next(new AppError(`plane with id: ${id} no found`, 404))
    }
    req.plane = plane
    next()
})