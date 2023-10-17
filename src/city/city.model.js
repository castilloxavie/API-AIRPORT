import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";

const City = sequelize.define('city',{
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        field: "cit_id"
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    country: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    lat: {
        type: DataTypes.FLOAT(),
        allowNull: false
    },
    lon: {
        type: DataTypes.FLOAT(),
        allowNull: false
    }
}, {
    indexes: [{
        unique: true,
        fields: ['name', 'country']
    }
        
    ]
})
    
export default City