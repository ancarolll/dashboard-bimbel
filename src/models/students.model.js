const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Students = sequelize.define('students', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    class_id: {
        type: DataTypes.UUID,
        references: {
            model:'classes',
            key: 'id',
        },
    },
    no_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('due_date', 'call', 'non_active'),
    }
}, {
    tableName: 'students',
    timestamps: true,
});


module.exports = Students;