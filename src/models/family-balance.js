const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const User = require('./user');

const familyBalanceSchema = new mongoose.Schema({
    familyName: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        min: 0,
        default: 0
    },
    history: [{
        userEmail: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    }]
})


familyBalanceSchema.virtual('users', {
    ref: 'User',
    localField: 'familyName',
    foreignField: 'family'
})


familyBalanceSchema.pre('remove', async function (next) {
    const balance = this
    console.log('test');
    const res = await User.updateMany({ family: balance.familyName }, {family: undefined});
    console.log(res.n)
    next()
})

const Balance = mongoose.model('Balance', familyBalanceSchema);

module.exports = Balance