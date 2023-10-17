import {  DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Passenger = sequelize.define('passenger', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "Pas_id"
    },
    nroPassport: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        field: "Nro_pasport"
    },
    name: {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('male', 'femeale', 'prefer not do say'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    cel: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    create_by: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    phone: {
        type:DataTypes.TEXT,
        allowNull: false,
        defaultValue: "sinFoto"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

})

export default Passenger