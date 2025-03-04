const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');

const StudentsHistory = sequelize.define('students_history', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'students',
            key: 'id'
        }
    },
    changed_field: {
        type: DataTypes.STRING,
        allowNull: false
    },
    old_value: {
        type: DataTypes.STRING,
        allowNull: true
    },
    new_value: {
        type: DataTypes.STRING,
        allowNull: true
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
    }
}, {
    tableName: 'students_history',
});

module.exports = StudentsHistory;