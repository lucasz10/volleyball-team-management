const router = require('express').Router();
const { Team, Player } = require('../../models');

router.post(':id/createPlayer', async (req, res) => {
    try {
        const currentTeam = await Team.findOne({ where: { id: req.params.id } })

        var newPlayerObj = JSON.parse(req.body)

        let newData = {
            team_id: currentTeam.id,
        }

        newPlayerObj.push(newData)

        await createTeam(JSON.stringify(newPlayerObj))
    
    } catch (err) {
        res.status(400).json(err)
    }
})