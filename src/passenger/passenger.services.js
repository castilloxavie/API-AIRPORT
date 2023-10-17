import Passenger from "./passergers.model.js";

export class PassengerServices {
    async findOnePassenger(id) {
        return await Passenger.findOne({
            where: {
                id,
                status: true,
            },
        });
    }

    async findAllPassengers() {
        return await Passenger.findAll({
            where: {
                status: true,
            },
        });
    }

    async createPassenger(data) {
        return await Passenger.create(data);
    }

    async updatePassenger(passenger, data) {
        return await passenger.update(data);
    }

    async deletePassenger(passanger) {
        return await passanger.update({
            status: false,
        });
    }
}
