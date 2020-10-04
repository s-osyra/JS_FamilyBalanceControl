const Balance = require('../models/family-balance');

const addCurrency = async (familyName, amount) => {

try {
    const family = await Balance.findOne({ familyName: familyName });
   
    if (!family) {
        throw 'Family not found'
    }

    family.balance = family.balance + amount; 
    const date =  new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    family.history.push( { amount: amount, userEmail: "Admin", date: date } );
    
    await family.save();

    return family;
} catch (e) {
    throw e;
}
}

module.exports = addCurrency;