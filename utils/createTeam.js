const sequelize = require('../config/connection');
const { Team } = require('../models');

const createTeam = async (newTeam) => {
    await sequelize.sync({ force: true });

    await Team.create(newTeam, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

module.exports = createTeam;