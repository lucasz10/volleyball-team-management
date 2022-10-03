const router = require('express').Router();
const { Team, User } = require('../../models');

router.post('/createTeam', async (req, res) => {
    try {
        const currentUser = await User.findOne({ where: { id: req.session.user_id } })

        var newTeamObj = JSON.parse(req.body)

        let newData = {
            user_id: currentUser.id,
        }

        newTeamObj.push(newData)

        await createTeam(JSON.stringify(newTeamObj))
    
    } catch (err) {
        res.status(400).json(err)
    }
})