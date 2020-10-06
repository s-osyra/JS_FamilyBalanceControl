const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Balance = require('../../src/models/family-balance');
const jwt = require('jsonwebtoken');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();
const adminId = new mongoose.Types.ObjectId();

const admin = {
    _id: adminId,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'adminPassword!12!',
    user_role: 'administrator',
    family: 'administrator',
    tokens: [{
        token: jwt.sign({ _id: adminId }, process.env.JWT_SECRET)
    }]
}

const userOne = {
    _id: userOneId,
    name: 'userOne',
    email: 'userone@example.com',
    password: 'userOnePassword!12!',
    user_role: 'user',
    family: 'familyOne',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwo = {
    _id: userTwoId,
    name: 'userTwo',
    email: 'usertwo@example.com',
    password: 'userTwoPassword!12!',
    user_role: 'user',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const familyOne = {
    familyName: 'familyOne',
    balance: 1000
}

const setupDB = async () => {
    await User.deleteMany();
    await Balance.deleteMany();
    await new User (admin).save();
    await new User (userOne).save();
    await new User (userTwo).save();
    await new Balance (familyOne).save();
}

module.exports = {
    userOneId,
    userTwoId,
    adminId,
    userOne,
    userTwo,
    admin,
    familyOne,
    setupDB,
}