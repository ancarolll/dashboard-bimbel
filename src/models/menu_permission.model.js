const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const MenuPermission = sequelize.define('menu_permissions', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    menu_id: {
        type: DataTypes.UUID,
        references: {
            model: 'menus',
            key: 'id'
        }
    },
    permission_action: {
        type: DataTypes.ENUM('post', 'get', 'put', 'delete'),
        allowNull: false
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
    tableName:'menu_permissions',
});

const Menu = require('./menu.model'); // adjust path as needed

MenuPermission.belongsTo(Menu, { foreignKey: 'menu_id' });
Menu.hasMany(MenuPermission, { foreignKey: 'menu_id' });


module.exports = MenuPermission;