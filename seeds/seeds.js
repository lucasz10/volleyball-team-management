const sequelize = require('../config/connection');
const { User, Player, Team } = require('../models');

const userData = require('./userData.json');
const playerData = require('./playerData.json');
const teamData = require('./teamData.json');


const seedUserData = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const User of userData) {
      await User.create({
        ...User,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedUserData();


  const seedPlayerData = async () => {
    await sequelize.sync({ force: true });
  
    const players = await Player.bulkCreate(playerData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const player of playerData) {
      await player.create({
        ...Player,
        player_id: players[Math.floor(Math.random() * players.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedPlayerData();

  const seedTeamData = async () => {
    await sequelize.sync({ force: true });
  
    const teams = await Team.bulkCreate(teamData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const team of teamData) {
      await Team.create({
        ...Team,
        team_id: teams[Math.floor(Math.random() * team.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedTeamData();