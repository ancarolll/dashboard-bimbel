const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Classes = sequelize.define('classes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    classs_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'classes',
    timestamps: true,
});


module.exports = Classes;