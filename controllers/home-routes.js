const router = require("express").Router();
const excelJS = require("exceljs");
const path = require("path");
const withAuth = require("../utils/auth");

const { Team, Player, Event } = require("../models");

router.get("/", async (req, res) => {
  try {
    if(!req.session.logged_in){
      res.render("login");
    } else {
      res.redirect('/homepage')
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/homepage", withAuth, async (req, res) => {
  try {
    const TeamData = await Team.findAll({
      where: { user_id: req.session.user_id },
    });

    const teams = TeamData.map((team) => team.get({ plain: true }));

    res.render("homepage", {
      teams,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/team/:id", withAuth, async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id);

    const playerData = await Player.findAll({
      where: { team_id: req.params.id },
    });

    const team = teamData.get({ plain: true });
    const players = playerData.map((player) => player.get({ plain: true }));

    res.render("teampage", {
      ...team,
      players,
      logged_In: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/team/:id/export", withAuth, async (req, res) => {
  const teamData = await Team.findByPk(req.params.id);

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${teamData.teamName}`);

  const filePath = "./files";

  worksheet.columns = [
    { header: "Player ID", key: "id", width: 10 },
    { header: "First Name", key: "first_name", width: 10 },
    { header: "Last Name", key: "last_name", width: 10 },
    { header: "Number", key: "player_number", width: 10 },
    { header: "Position", key: "position", width: 10 },
  ];

  const playerData = await Player.findAll({
    where: { team_id: req.params.id },
  });

  playerData
    .map((player) => player.get({ plain: true }))
    .forEach((player) => {
      worksheet.addRow(player);
    });

  try {
    const fileName = `${filePath}/${teamData.teamName}.xlsx`;
    await workbook.xlsx.writeFile(fileName);
    res.attachment(`${teamData.teamName}.xlsx`);
    res.sendFile(path.join(__dirname, "../", fileName));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.get('/Event/:id', async (req, res) => {
//   try {
//     const EventData = await Event.findAll(req.params.id);

//     const events  = EventData.map((team) =>
//       events.get({ plain: true })
//     );

//     res.render('Event', {
//       events,
//       logged_In: req.session.logged_In,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
