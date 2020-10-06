const express = require('express');
const auth = require('../middleware/auth');
const User = require ('../models/user');
const Balance = require('../models/family-balance');
const addUserToFamily = require('../utilis/add-user-to-family');
const addCurrency = require('../utilis/add-currency');
const removeUserFromFamily = require('../utilis/remove-user-from-family');
const adminAuth = require('../middleware/admin-auth');
const path = require('path');
const router = new express.Router();
const publicDirectoryPath =  path.join(__dirname, '/../../public');
router.use(express.static(publicDirectoryPath));

router.get('/admin/panel', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/admin-panel.html'));
});

router.post('/admin/family/create', auth, adminAuth, async (req, res) => {

    try {
        familyBalance = new Balance({"familyName": req.body.familyName});
        await familyBalance.save();
        res.send(familyBalance);
    } catch (e) {
        res.status(500).send()
    };
});

router.post('/admin/family/add',  async (req, res) => {
    try {
        const family = await addCurrency(req.body.familyName, req.body.amount)
        res.send(family);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.post('/admin/family/addmember', auth, adminAuth, async (req, res) => {
    try {
        const user = await addUserToFamily(req.body.email, req.body.familyName);
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.post('/admin/family/removemember', auth, adminAuth, async (req, res) => {
    try {
        const user = await removeUserFromFamily(req.body.email);
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    };
});

router.post ('/admin/family/remove', auth, adminAuth, async (req, res) => {
    try {
        const balance = await Balance.findOne({ familyName: req.body.familyName });
        if(!balance) {
            res.status(404).send('Incorrect input data.');
        };
        balance.remove();
        res.send();
    } catch (e) {
        res.status(500).send();
    };
});

module.exports = router;