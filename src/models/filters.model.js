const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Filters = sequelize.define('filters', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    filter_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filter_type: {
        type: DataTypes.ENUM('all', 'due_date', 'call'),
        allowNull: 'all',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
}, {
    tableNames: 'filters'
});

module.exports = Filters;