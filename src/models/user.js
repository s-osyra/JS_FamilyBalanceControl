const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String, 
        trim: true,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error ('Invalid email address.');
            }
        }
    },
    family: {
        type: String,
        trim: true,
        lowercase: true,
    },
    user_role: {
        type: String,
        trim: true,
        default: 'user'
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};
userSchema.pre('save',async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    };
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;