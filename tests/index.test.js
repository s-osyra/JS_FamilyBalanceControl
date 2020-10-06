const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');
const Balance = require('../src/models/family-balance');
const { userOneId, userTwoId, adminId, userOne,userTwo, admin, familyOne, setupDB } = require('./fixtures/db')

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

test ('Should login user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})



test ('Should return family balace', async () => {
    await request(app)
        .get('/balance')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})



test ('Should add currency', async () => {
    const amount = 200;
    
    await request(app)
        .post('/admin/family/add')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send ({
            familyName: familyOne.familyName,
            amount: amount
        })
        .expect(200)

    const balance = await Balance.findOne( {familyName: familyOne.familyName} )
    expect(balance.balance).toEqual(familyOne.balance + amount)
    })
