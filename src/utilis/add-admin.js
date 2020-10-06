const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/family-budget", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
const admin = {
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin',
    user_role: 'administrator',
    family: 'administrator',
};
const foo = async () => {
    await new User (admin).save();
    mongoose.disconnect();
};

foo();

