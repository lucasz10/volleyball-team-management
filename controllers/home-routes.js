const router = require('express').Router();
const { Team, Player, Event } = require('../models');

router.get('/', async (req, res) => {
    try {
      const TeamData = await Team.findAll({
        include: [
          {
            model: Team,
            attributes: [
               'id',
               'teamName',
               'teamRecord',
            ]
          },
        ],
      });
  
      const TeamRender  = TeamData.map((team) =>
        team.get({ plain: true })
      );
  
      res.render('homepage', {
        TeamRender,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/Player/:id', async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      try {
        const PlayerData = await Player.findByPk(req.params.id, {
          include: [
            {
              model: Player,
              attributes: [
                'id',
                'first_name',
                'last_name',
                'player_birthdate',
                'player_number',
                'position',
                'player_notes',
                'team_id',
              ],
            },
          ],
        });
        const PlayerRender = PlayerData.get({ plain: true });
        res.render('Player', { PlayerRender, loggedIn: req.session.loggedIn });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });

  
  router.get('/Event/:id', async (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
        try {
            const EventData = await Event.findByPk(req.params.id, {
              include: [
                {
                  model: Event,
                  attributes: [
                    'id',
                    'event_type',
                    'event_name',
                    'event_date',
                    'team_id',
                  ],
                },
              ],
            });
      
        const EventRender = EventData.get({ plain: true });
  
        res.render('Event', { EventRender, loggedIn: req.session.loggedIn });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
module.exports = router;