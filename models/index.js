const User = require('./User');
const Team = require('./Team');
const Player = require('./Player');
const Event = require('./Event')

User.hasMany(Team, {
    foreignKey: 'user_id',
})

Team.belongsTo(User, {
    foreignKey: 'user_id',
})

Team.hasMany(Player, {
    foreignKey: 'team_id',
})

Team.hasMany(Event, {
    foreignKey: 'team_id',
})

Player.belongsTo(Team, {
    foreignKey: 'team_id',
})

Event.belongsTo(Team, {
    foreignKey: 'team_id',
})

module.exports = { User, Team, Player, Event };