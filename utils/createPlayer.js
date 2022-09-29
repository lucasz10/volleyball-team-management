const sequelize = require('../config/connection');
const { Player } = require('../models');

const createPlayer = async (newPlayer) => {
    await sequelize.sync({ force: true });

    await Player.create(newPlayer, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

module.exports = createPlayer;