const request = require ('supertest');
const app = require ('../src/app');
const User = require ('../src/models/user');
const Balance = require('../src/models/family-balance');
const { userOneId, userTwoId, adminId, userOne,userTwo, admin, familyOne, setupDB } = require('./fixtures/db')

beforeEach(setupDB);



test ('Should add family', async () => {
    const newFamily = 'newFamily';
    
    await request(app)
        .post('/admin/family/create')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send ({
            familyName: newFamily
        })
        .expect(200);

    const balance = await Balance.findOne( {familyName: newFamily} );
    expect(balance).not.toBeNull();
    });


    test ('Should add family member', async () => {

        await request(app)
            .post('/admin/family/addmember')
            .set('Authorization', `Bearer ${admin.tokens[0].token}`)
            .send ({
                familyName: familyOne.familyName,
                email: userTwo.email
            })
            .expect(200);
    
        const user = await User.findById(userTwoId);
        expect(user.family).toEqual(familyOne.familyName.toLowerCase());
        });




test ('Should add currency', async () => {
    const amount = 200;
    
    await request(app)
        .post('/admin/family/add')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send ({
            familyName: familyOne.familyName,
            amount: amount
        })
        .expect(200);

    const balance = await Balance.findOne( {familyName: familyOne.familyName} );
    expect(balance.balance).toEqual(familyOne.balance + amount);
    });

    test ('Should remove family member', async () => {

        await request(app)
            .post('/admin/family/removemember')
            .set('Authorization', `Bearer ${admin.tokens[0].token}`)
            .send ({
                email: userOne.email
            })
            .expect(200);
    
        const user = await User.findById(userOneId);
        expect(user.family).toEqual(undefined);
        });


        test ('Should remove family', async () => {

            await request(app)
                .post('/admin/family/remove')
                .set('Authorization', `Bearer ${admin.tokens[0].token}`)
                .send ({
                    familyName: familyOne.familyName
                })
                .expect(200);
        
            });