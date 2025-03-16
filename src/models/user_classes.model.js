const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const UserClasses = sequelize.define('user_classes', {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    class_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'classes',
            key: 'id',
        }
    }
}, {
    tableName: 'user_classes',
    timestamps: true
});

module.exports = UserClasses;
