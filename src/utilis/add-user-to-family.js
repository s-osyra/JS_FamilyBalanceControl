const User = require('../models/user');
const Balance = require('../models/family-balance');

const addUserToFamily = async (userEmail, familyName) => {
    try {
        const user = await User.findOne({ email: userEmail });
        const family = await Balance.findOne({ familyName: familyName });
        if (!user || !family) {
            throw 'Invalid data.';
        };
        if( user.family ) {
            throw 'Usere already in family.'
        };

        user.family = familyName;
        await user.save();
        return user;
    } catch (e) {
        throw (e);
    };
};

module.exports = addUserToFamily;