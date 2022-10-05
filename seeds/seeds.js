const User = require("../models/User");
const Player = require("../models/Player");
const Team = require("../models/Team");

const seedUserData = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const project of userData) {
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
  
    const player = await Player.bulkCreate(playerData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const project of playerData) {
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
  
    for (const project of teamData) {
      await Team.create({
        ...Team,
        team_id: team[Math.floor(Math.random() * team.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedTeamData();