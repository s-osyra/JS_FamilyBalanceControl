const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth')
const findByCredentials = require('../utilis/find-by-credentials');

router.post ('/users', async (req, res) => {
    let user = new User (req.body);
    if (user.family) {
       user.family = undefined;
    };
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    };
})

router.post ('/users/login', async (req, res) => {
    try {
        const user = await findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400).send(e);
    };
});

router.post('/users/logout', auth, async (req,res) => { 
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    };
});

router.post('/users/logoutall', auth, async (req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    };
});

router.patch('/users/me', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))
    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid update'})
    };
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send();
    };
});

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove();
        res.send(req.user);
    } catch (e){
        res.status(500).send();
    };
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

module.exports = router;