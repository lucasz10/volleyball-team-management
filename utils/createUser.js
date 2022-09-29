const sequelize = require('../config/connection');
const { User } = require('../models');

const createUser = async (newUser) => {
    await sequelize.sync({ force: true });

    await User.create(newUser, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

module.exports = createUser;