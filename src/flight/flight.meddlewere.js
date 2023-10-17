import{ AppError, catchAsync } from "../error/index.js"
import{ FlightServices } from "./flight.services.js"

const flightservises = new FlightServices()


export const validateExisFlight = catchAsync(async(req, res, next) => {
    const {id} = req.params 
    const flight = await flightservises.findOneFlight(id)

    if(!flight){
        return next( new AppError(`flight with id: ${id} no found`, 404))
    }
    req.flight = flight
    next()

} )