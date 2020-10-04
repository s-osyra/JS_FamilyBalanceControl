const { use } = require('../app');
const Balance = require('../models/family-balance');

const menageCurrency = async (user, amount) => {

try {
    const family = await Balance.findOne({ familyName: user.family });
   
    if (!family) {
        throw 'Family not found';
    }

    if (family.balance < amount) {
        throw 'Not enough currency!';
    }
    if (amount <= 0) {
        throw 'Invalid amount.'
    }

    family.balance = family.balance - amount;
   
    const date =  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    family.history.push( { amount: amount*(-1), userEmail: user.email, date: date } );

    await family.save();

    return family;
} catch (e) {
    throw e;
}
}

module.exports = menageCurrency;