const sequelize = require('../config/connection');
const { Event } = require('../models');

const createEvent = async (newEvent) => {
    await sequelize.sync({ force: true });

    await Event.create(newEvent, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}

module.exports = createEvent;