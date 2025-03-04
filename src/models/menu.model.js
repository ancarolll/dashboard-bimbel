const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const Menu = sequelize.define('menu', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    menu_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    menu_desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu_icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    menu_group: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName:'menus',
});

module.exports = Menu;