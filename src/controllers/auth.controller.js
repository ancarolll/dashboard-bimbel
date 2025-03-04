const  Users  = require('../models/users.model');

module.exports = {
    login: async (req, res) => {
        try {
            const user = await Users.findOne({
                where: {
                    username: req.body.username
                }
            });

            console.log(user);

            if(!user) {
                return res.json({
                    status: "error",
                    message: "Username or password is incorrect",
                    data: []
                })
            }
            
            const user_validate = await user.validateUser(user.username, req.body.password);

            if(!user_validate) {
                return res.status(404).json({
                    status: "error",
                    message: "Username or password is incorrect",
                    data: []
                })
            }

            const token = user.generateToken();

            return res.json({
                status: "success",
                message: "Login Success",
                data: {
                    token: token,
                    user: user
                }
            })
            

        }catch (error) {
            console.log(error);
            return res.json({
                status: "error",
                message: "Internal Server Error",
                data: []
            })
        }
    }
}