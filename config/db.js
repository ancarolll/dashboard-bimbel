const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_kursus', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    logging: console.log, // Debugging
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log(sequelize.models); 
        console.log("Database connected successfully.");

        await sequelize.sync({ alter: true });
        console.log("Database & tables created!");
    } catch (error) {
        console.error("Error during database setup:", error);
    }

})()




module.exports = sequelize;
