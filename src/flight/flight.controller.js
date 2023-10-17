import { CityService } from "../city/city.services.js";
import { envs } from "../config/enviroments/enviroments.js";
import { httpClient } from "../config/pluguins/httpClientPlugins.js";
import { AppError, catchAsync } from "../error/index.js";
import { validateFight, validatePartialFlight } from "./flight.schema.js";
import { FlightServices } from "./flight.services.js";

const flightServices = new FlightServices();
const cityServices = new CityService();

export const flightCreate = catchAsync(async (req, res) => {
    const { hasError, errorMessage, flightData } = validateFight(req.body);

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const flight = await flightServices.createFlight(flightData);
    return res.status(201).json(flight);
});

export const flightFindOne = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.query;

    const flight = await flightServices.findOneFlight(id, status);

    if (!flight) {
        return next(new AppError(`Flight with id ${id} not found`, 400));
    }

    return res.status(200).json(flight);
});

export const flightFindAll = catchAsync(async (req, res, next) => {
    const flight = await flightServices.findAllflight();
    return res.json(flight);
});

export const flightUpdate = catchAsync(async (req, res) => {
    const { hasError, errorMessage, flightData } = validatePartialFlight(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const { id } = req.params;
    const flight = await flightServices.findOneFlight(id);

    if (!flight) {
        return res.status(404).json({
            status: "error",
            message: `Flight with id ${id} not found`,
        });
    }

    const flightUpdate = await flightServices.updateFlight(flight, flightData);

    return res.json(flightUpdate);
});

export const flightDelete = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const flight = await flightServices.findOneFlight(id, "pending");

    if (!flight) {
        return res.status(404).json({
            status: "error",
            message: `Flight with id ${id} not found`,
        });
    }

    await flightServices.deleteFlight(flight);
    return res.status(204).json(null);
});

export const approveFlight = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const flight = await flightServices.findOneFlight(id);

    if (!flight) {
        return next(new AppError(`Flight with id${id} not found`, 404));
    }

    const originCity = await cityServices.findOneCity(flight.originId);

    if (!originCity) {
        return next(new AppError("city of origin does not exist"));
    }

    const destinationCity = await cityServices.findOneCity(flight.detinationId);

    if (!destinationCity) {
        return next(new AppError("city of destiny does't exists"));
    }

    const weatherCondition = await httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.lon}&appid=${envs.APY_KEY_WEATHERMAP}`
    );

    if(weatherCondition.weather[0].main === "Clouds"){
        return next(new AppError("weather condition do not meet the requeriments for takeoff", 400))
    }

    const updateFlight = await flightServices.update(flight, {
        status: "inProgress",
        checkIn: new Date()
    })

    return res.status(200).json(updateFlight)

});
