const User = require('../models/user');
const bcrypt = require ('bcryptjs');

const findByCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error ('Unable to login');
        };
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error ('Unable to login');
        }; 
    return user;
    } catch (e){
        throw (e);
    };
};

module.exports = findByCredentials;