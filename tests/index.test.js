const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');
const Balance = require('../src/models/family-balance');
const { userOneId, userTwoId, adminId, userOne,userTwo, admin, setupDB } = require('./fixtures/db')

beforeEach(setupDB)

test ('Should sign in new user', async () => {
    const response = await request(app).post('/users').send({
        name: "newTestUser",
        email: 'newTestemail@test.com',
        password: 'myTestPassword!1'
    }).expect(201)

    // Checking if new user is saved
    const user = User.findById(response.body._id)
    expect(user).not.toBeNull()
})

