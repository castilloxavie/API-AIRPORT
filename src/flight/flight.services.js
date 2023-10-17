import { Op } from "sequelize";

import Flight from "./flight.model.js";

export class FlightServices {

    async createFlight(data) {
        return await Flight.create(data);
    }

    async findOneFlight(id, status) {
        let whereClause = {
            id,
            status,
        };

        if(!status){
            //pending, inProgress, done, cancelled, delayed
            whereClause.status = {
                [Op.in]:["pending", "inProgress", "done"]
            }
        }

        return await Flight.findOne({
            where: whereClause,
        });
    }


    async findAllflight() {
        return await Flight.findAll({
           where: {
            status : {
                [Op.notIn]: ["done", "cancelled"]
            }
           }
        });
    }

    async updateFlight(flight, data) {
        return await flight.update(data);
    }

    async deleteFlight(flight) {
        return await flight.update({
            status: "cancelled",
        });
    }
}
