const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Welcome to API Dashboard Kursus');
});




router.use('/admin_accounts', require('./route/admin_account.route'));
router.use('/classes', require('./route/classes.route'));
router.use('/filters', require('./route/filters.route'));
router.use('/student_history', require('./route/students_history.route'));
router.use('/students', require('./route/students.route'));
router.use('/uploads', require('./route/uploads.route'));
router.use('/users', require('./route/users.route'));
router.use('/auth', require('./route/auth.route'));
router.use('/menu', require('./route/menu.route'));
router.use('/dashboard', require('./route/dashboard.route'));
router.use('/role', require('./route/role.route'));


module.exports = router;