import { AppError, catchAsync } from "../error/index.js";
import { CityService } from "./city.services.js";

const cityService = new CityService

export const validateExisCity = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const city = await cityService.findOneCity(id)

    if (!city) {
        return next(new AppError(`City with id: ${id} no found`, 404))
    }
    req.city = city
    next()
})