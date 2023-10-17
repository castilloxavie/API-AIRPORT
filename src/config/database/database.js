import { Sequelize } from "sequelize";

import { envs } from "../enviroments/enviroments.js";

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false,
});

export async function authenticate() {
    try {
        await sequelize.authenticate();
        console.log("connection has been successfully.");
    } catch (error) {
        throw new Error("Error al autenticar: ", error);
    }
}

export async function syncUp(){
    try {
        // await sequelize.sync({force: true})
        await sequelize.sync()
        console.log("connection has been sy");
    } catch (error) {
        throw new Error("synchronization error: ", error)
    }
}

export default sequelize
