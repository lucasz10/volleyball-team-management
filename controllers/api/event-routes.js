const router = require('express').Router();
const { Event } = require('../../models');

router.post('/createEvent', async (req, res) => {
    try {
        
        await Event.create(req.body)

        res.status(200).json({ message: 'Event created successfully!'})
        
    } catch (err) {
        res.status(400).json(err)
    }
    
})

module.exports = router;