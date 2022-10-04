const router = require('express').Router();
const { Player } = require('../../models');

router.post('/createPlayer', async (req, res) => {
    try {
        
        await Player.create(req.body)

        res.status(200).json({ message: 'Player created successfully!'})
        
    } catch (err) {
        res.status(400).json(err)
    }
    
})

module.exports = router;