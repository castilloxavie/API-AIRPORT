import {catchAsync} from "../error/index.js"
import { validateCity, validatePartialCity } from "./city.schema.js";
import { CityService } from "./city.services.js";

const cityService = new CityService();

//!createCity
export const createCity = catchAsync(async (req, res) => {
        const {hasError, errorMessage, cityData} = validateCity(req.body)
        if(hasError){
            return res.status(422).json({
                status:"error",
                message: errorMessage
            })
        }

        const city = await cityService.createCity(cityData);
        return res.status(201).json(city);
   
})

//!findCity
export const findCity = catchAsync(async (req, res) => {
        const city = await cityService.findAllCity();
        res.json(city);
    
})

//!findOnecity
export const findOnecity = catchAsync(async (req, res) => {
        const {city} = req;
        return res.status(200).json(city);
        // const { id } = req.params;
        // const city = await cityService.findOneCity(id);

        // if (!city) {
        //     return res.status(404).json({
        //         status: "error",
        //         message: `City with id: ${id} no found`,
        //     });
        // }  
})

//! updateCity
export const updateCity = catchAsync(
    async (req, res) => {
        
            const {city} = req
            // const { id } = req.params;
            const {hasError, errorMessage, cityData} = validatePartialCity(req.body)
            if(hasError){
                return res.status(422).json({
                    status: "error",
                    message: errorMessage
                })
            }
    
            // const city = await cityService.findOneCity(id);
    
            // if (!city) {
            //     return res.status(404).json({
            //         status: "error",
            //         message: `City with id: ${id} no found`,
            //     });
            // }
    
            const updateCity = await cityService.updateCity(city, cityData);
       
    }
)

//! deleteCity
export const deleteCity = catchAsync(async (req, res) => {
        const {city} =req
        // const { id } = req.params;
        // const city = await cityService.findOneCity(id);

        // if (!city) {
        //     return res.status(404).json({
        //         status: "error",
        //         message: `city with id ${id} not found`,
        //     });
        // }

        await cityService.deleteCity(city);
        return res.status(204).json(null);
    
})
