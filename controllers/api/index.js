const router = require('express').Router();

const userRoutes = require('./user-routes');
const teamRoutes = require('./team-routes');
const playerRoutes = require('./player-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/players', playerRoutes);

module.exports = router;