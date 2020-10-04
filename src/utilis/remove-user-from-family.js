const User = require('../models/user');

const removeUserFromFamily = async (email) => {
    try {
        const user = await User.findOne({email: email});

        if (!user) {
            throw 'User not found!'
        }
        user.family = undefined
        await user.save();

        return user;

    } catch (e) {
        throw (e);
    }
}


module.exports = removeUserFromFamily;