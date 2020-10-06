const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');
const Balance = require('../src/models/family-balance');
const { userOneId, userTwoId, adminId, userOne,userTwo, admin, familyOne, setupDB } = require('./fixtures/db')
const bcrypt = require('bcryptjs');
const { use } = require('../src/app');

beforeEach(setupDB);

test ('Should sign in new user', async () => {
    const response = await request(app).post('/users').send({
        name: "newTestUser",
        email: 'newTestemail@test.com',
        password: 'myTestPassword!1'
    }).expect(201);

    // Checking if new user is saved
    const user = User.findById(response.body._id);
    expect(user).not.toBeNull();

    //Checking if password is hashed
    expect(userOne.password).not.toEqual(user.password);
});

test ('Should not sign in new user', async () => {

    // Cheking if can use same mail twice.
    await request(app).post('/users').send({
        name: "user",
        email: userOne.email,
        password: 'myTestPassword!1'
    }).expect(400);

    // Cheking if password can be short.
    await request(app).post('/users').send({
        name: "newTestUser",
        email: 'newTestemail@test.com',
        password: 'myTe'
    }).expect(400);
});

test ('Should login user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email: userOne.email,
        password: userOne.password
    })
    .expect(200);
});

test ('Should not login user', async () => {
    await request(app)
    .post('/users/login')
    .send({
        email: userTwo.email,
        password: userOne.password
    })
    .expect(400);
});

test ('Should change user data', async () => {
    const newEmail = 'newuseremail@test.com';
    const newPassword = 'userOne.password';
    const newName = 'newName';

    const response = await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        email: newEmail,
        password: newPassword,
        name: newName
    })
    .expect(200);

    // Cheking if data has been changed
    const user = await User.findById(response.body._id);
    const isMatch = await bcrypt.compare(newPassword, user.password)
    expect(user.email).toEqual(newEmail);
    expect(isMatch).toEqual(true);
    expect(user.name).toEqual(newName);
});

test ('Should logout', async () => {

    const user = await User.findById(userOneId);
    await user.generateAuthToken();
    await user.save();

    const response = await request(app)
    .post('/users/logout')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

});

test ('Should logoutall', async () => {

    const user = await User.findById(userOneId);
    await user.generateAuthToken();
    await user.save();

    const response = await request(app)
    .post('/users/logoutall')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

});


test ('Should delete', async () => {

    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

    // Checking if user has been deleted
    const user = await User.findById(userOneId);
    expect(user).toBeNull();

});




