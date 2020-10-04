const express = require('express');
const auth = require('../middleware/auth');
const Balance = require('../models/family-balance');
const removeCurrency = require('../utilis/remove-currency');

const router = new express.Router();


router.get ('/balance', auth, async (req, res) => {  
    
    if (!req.user.family) {
        res.status(400).send("Family not found.")
    }
    try {
        
        const family = await Balance.findOne({ familyName: req.user.family })

        res.send(family);

    } catch (e) {
        res.status(500).send("Internal server error.")
    }
})


router.post ('/balance', auth, async (req, res) => {
    try {
        const family = await removeCurrency(req.user, req.body.amount);
        res.send(family);

    } catch (e) {
        res.status(500).send(e)
    }

})



module.exports = router;