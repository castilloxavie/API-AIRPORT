import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";

const Flight = sequelize.define("flight", {
    id: {
        primaryKey: true,
        allowNull:false,
        autoIncrement: true,
        type:DataTypes.INTEGER,
        field: "flight_id"
    },
    originId:{
        type: DataTypes.INTEGER,
        field: "origin_Id"
    },
    detinationId:{
        type: DataTypes.INTEGER,
        field: "detination_id"
    },
    plaintId:{
        type: DataTypes.INTEGER,
        field: "plaint_id"
    },
    departureTime:{
        type:DataTypes.TIME,
        allowNull:false,
        field: "departure_time"
    },
    checkIn:{
        type:DataTypes.TIME,
        allowNull: true,
        field: "check_in"
    },
    status: {
        type:DataTypes.ENUM("pending", "inProgress", "done","cancelled", "delayed"),
        allowNull: false,
        defaultValue:"pending"
    }

})

export  default Flight