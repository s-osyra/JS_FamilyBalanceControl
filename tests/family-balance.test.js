const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');
const Balance = require('../src/models/family-balance');
const { userOneId, userTwoId, adminId, userOne,userTwo, admin, familyOne, setupDB } = require('./fixtures/db')

beforeEach(setupDB);

test ('Should return family balace', async () => {
    await request(app)
        .get('/balance')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200);
});

test ('Should reduce family balance', async () => {
    const amount = 200;

    await request(app)
        .post('/balance')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send ({
            amount: amount
        })
        .expect(200);
        const balance = await Balance.findOne( {familyName: familyOne.familyName} );
    expect(balance.balance).toEqual(familyOne.balance - amount);
   
});


test ('Should not reduce family balance', async () => {
    const amount = 20000;

    await request(app)
        .post('/balance')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send ({
            amount: amount
        })
        .expect(500);
        const balance = await Balance.findOne( {familyName: familyOne.familyName} );
    expect(balance.balance).toEqual(familyOne.balance);
   
});