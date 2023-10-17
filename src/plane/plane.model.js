import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";

const Planes = sequelize.define("planes", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "plane_id",
    },
    planeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: " plane_number",
    },
    model: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    maxCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "max_capacity",
    },
    arline: {
        type: DataTypes.ENUM(
            "AeroGlobe",
            "AeroTronix",
            "VelocityAir",
            "AirQuest",
            "StartLink"
        ),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export default Planes
