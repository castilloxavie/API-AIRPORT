import {AppError, catchAsync} from "../error/index.js"
import { validatePartialPassenger, validatePassenger } from "./passenger.schema.js";
import { PassengerServices } from "./passenger.services.js";

const passengerServices = new PassengerServices();




//!findAllPassgers
export const findAllPasserger = catchAsync(async (req, res, next) => {
    const passerger = await passengerServices.findAllPassengers();
    return res.json(passerger);
});

//!createPassenger
export const createPassenger = catchAsync(async (req, res) => {
    const { hasError, errorMessage, passengerData } = validatePassenger(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const passenger = await passengerServices.createPassenger(passengerData);
    return res.status(201).json(passenger);
});

//!findOnePassenger
export const findOnePassenger = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const passenger = await passengerServices.findOnePassenger(id);

    if (!passenger) {
        return next(new AppError(`Passenger with id: ${id} no found`, 404));
    }

    return res.json(passenger);
});

//!updatePassenger
export const updatePassenger = catchAsync(async (req, res) => {
    const { hasError, errorMessage, passengerData } = validatePartialPassenger(
        req.body
    );
    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const { id } = req.params;

    const passenger = await passengerServices.findOnePassenger(id);

    //validacion del pasajero
    if (!passenger) {
        return res.status(404).json({
            status: "error",
            message: `passenger with id ${id} not found`,
        });
    }
    //actualizacion del pasajero
    const updatedPassenger = await passengerServices.updatePassenger(
        passenger,
        passengerData
    );

    return res.json(updatedPassenger);
});

//!deletePassenger
export const deletePassenger = catchAsync(async (req, res) => {
    const { id } = req.params;
    const passanger = await passengerServices.findOnePassenger(id);

    if (!passanger) {
        return res.status(404).json({
            status: "error",
            message: `passenger with id ${id} not found`,
        });
    }

    await passengerServices.deletePassenger(passanger);

    return res.status(204).json(null);
});
