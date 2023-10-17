import { DataTypes } from "sequelize";

import sequelize from "../config/database/database.js";
import { encrytedPassword } from "../config/pluguins/encripted.password.plugin.js";

const User = sequelize.define("user", {
    id:{
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    fullname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    gender:{
        type: DataTypes.ENUM("male", "female", "perfer not to say"),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(
            "receptionist",
            "admin",
            "developer",
            "manager",
            "user"
        ),
        allowNull: false,
        defaultValue: "user"
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    chagedPasswordAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            user.password = await encrytedPassword(user.password)
        }
    }
})

export default User
    