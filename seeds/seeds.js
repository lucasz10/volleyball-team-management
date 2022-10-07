const sequelize = require('../config/connection');
const { User, Player, Team, Event } = require('../models');

const userData = require('./userData.json');
const playerData = require('./playerData.json');
const teamData = require('./teamData.json');
const eventData = require('./eventData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const team of teamData) {
      await Team.create({
        ...team,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    for (const player of playerData) {
      await Player.create({
        ...player,
      });
    }

    for (const event of eventData) {
      await Event.create({
        ...event,
      });
    }

  
    process.exit(0);
  };
  
seedDatabase();