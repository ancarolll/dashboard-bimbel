const sequelize = require('../../config/db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Users = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'guru', 'kelas'),
        defaultValue: 'guru',
    }
}, {
    tableName: 'users',
    timestamps: true,
});

// Hash password before saving
Users.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

// Validate password
Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

Users.prototype.validateUser = function (username, password) {
    const user = Users.findOne({
        where: {
            username: username,
        },
    });
    if (!user) {
        return false;
    }
    return this.validPassword(password);
}

// Generate JWT token
Users.prototype.generateToken = function () {
    return jwt.sign({ id: this.id, role: this.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = Users;
