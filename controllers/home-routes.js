const router = require('express').Router();
const { Team, Player, Event } = require('../models');

router.get('/homepage/', async (req, res) => {
    try {
      const TeamData = await Team.findAll({where: {user_id: req.session.user_id
      }});
  
      const teams  = TeamData.map((team) =>
        team.get({ plain: true })
      );
  
      res.render('homepage', {
        teams,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  
  router.get('/Team/:id', async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
        try {
            const TeamData = await Team.findByPk(req.params.id);
      
            const PlayerData = await Player.findAll({where: {team_id: req.params.id}})

        const teams = TeamData.get({ plain: true });
        const players = PlayerData.get({plain: true});

        res.render('Team', {
        ...teams,
        players,
        loggedIn: req.session.loggedIn 
    });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }});

   
  
module.exports = router;