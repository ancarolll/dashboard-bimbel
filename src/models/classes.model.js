const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
const UserClasses = require('./user_classes.model');

const Classes = sequelize.define('classes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    class_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'classes',
    timestamps: true,
});

Classes.belongsToMany(require('./users.model'), { through: UserClasses, foreignKey: 'class_id' });


module.exports = Classes;