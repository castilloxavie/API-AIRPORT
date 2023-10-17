import { AppError, catchAsync } from "../error/index.js";
import { validatePartialPlane, validatePlane } from "./plane.schema.js";
import { PlaneServices } from "./plane.services.js";

const planeservices = new PlaneServices();

export const planeCreate = catchAsync(async (req, res) => {
    const { hasError, errorMessage, planeData } = validatePlane(req.body);

    if (hasError) {
        return resizeBy.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const plane = await planeservices.createPlane(planeData);
    return res.status(201).json(plane);
});

export const planeFindOne = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const plane = await planeservices.findOnePlane(id);

    if (!plane) {
        return next(new AppError(`plane with id: ${id} no found`, 404));
    }

    return res.json(plane);
});

export const planeFindAll = catchAsync(async (req, res, next) => {
    const plane = await planeservices.findAllPlane();
    return res.json(plane);
});

export const planeUpdate = catchAsync(async (req, res) => {
    const { hasError, errorMessage, planeData } = validatePartialPlane(
        req.body
    );

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage,
        });
    }

    const { id } = req.params;
    const plane = await planeservices.findOnePlane(id);
    

    if (!plane) {
        return res.status(404).json({
            status: "error",
            message: `Flight with id ${id} not found`,
        });
    }

    const planeUpdate = await planeservices.updatePlane(plane, planeData);
    console.log("datos de plane", plane);
    console.log("datos de planeData", planeData);

    return res.json(planeUpdate);
});

export const planeDelete = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const plane = await planeservices.findOnePlane(id);

    if (!plane) {
        return res.status(404).json({
            status: "error",
            message: `plane with id ${id} not found`,
        });
    }

    await planeservices.deletePlane(plane);
    return res.status(204).json(null);
});
