const router = require('express').Router();
const { Team, User } = require('../../models');

router.post('/createTeam', async (req, res) => {
    try {

        await Team.create({
            ...req.body, 
            user_id: req.session.user_id 
        })
        res.status(200).json({ message: 'Team created successfully!'})

    } catch (err) {
        res.status(400).json(err)
    }
    
})

module.exports = router;