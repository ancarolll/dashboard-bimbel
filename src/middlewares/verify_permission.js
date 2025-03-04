const jwt = require('jsonwebtoken');
const MenuPermission = require('../models/menu_permission.model');
const Menu = require('../models/menu.model');

const verifyPermission = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const action = req.method.toLowerCase(); // Map HTTP methods to CRUD
        const menu_slug = req.baseUrl.split('/')[2]; // Extract first segment of URL, like 'dashboard'

        if (!action || !menu_slug) return res.status(400).send('Missing action or menu slug');

        console.log(menu_slug, action, req.user.id);

        const menuPermission = await MenuPermission.findOne({
            where: {
                user_id: req.user.id,
                permission_action: action
            },
            include: [
                {
                    model: Menu,
                    where: {
                        menu_slug: menu_slug
                    }
                }
            ]
        });

        // console.log(menuPermission)

        if (!menuPermission) return res.status(403).send('Permission denied');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            status: 'failed',
            message: 'Invalid token',
            data: error
        });
    }
};

module.exports = verifyPermission;
