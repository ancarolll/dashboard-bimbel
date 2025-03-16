const Users = require('./users.model');
const Classes = require('./classes.model');
const UserClasses = require('./user_classes.model');

// Define Many-to-Many Relationship
Users.belongsToMany(Classes, { through: UserClasses, foreignKey: 'user_id' });
Classes.belongsToMany(Users, { through: UserClasses, foreignKey: 'class_id' });

module.exports = { Users, Classes, UserClasses };
