# JS_FamilyBalanceControl

Project based on Express.js and MongoDB. Main goal was to prepare application helping control common account balance of all family members.
There is one main administrator that control number of families, members, etc.
REST API based on JSON communication in requests body.
Authorization based on Bearer token with use of JWT. 
Application saves history of all income and outcomes per family.

## Installation

After download or pulling app, redirect into download direction and run `npm update`.

## Database and ports control
For changing environment for tests or development, please edit *.env files in config directory.
After checking DB data, add admin with script: src/utilis/add-admin.js
CORS has been disabled in order to proceed with testing.

## Endpoints

### Admin:
* /admin/panel – [GET]  -  control panel for admin with basic operations, tag
* /admin/family/create  - [POST] - create new family { familyName },
* /admin/family/add - [POST] – adding currency to family account { familyName, amount },
* /admin/family/addmember - [POST ]– adding member to family  { familyName, email },
* /admin/family/removemember - [POST] – removing member from family { email },
* /admin/family/remove - [POST] –  removing family { familyName },

### Family balance:
* /balance – [GET] – returning family balance of authorized user,
* /balance – [POST] – returning family balance of authorized user { amount },

### User:
* /users – [POST] – creates new user { name, email, password },
* /users/login – [POST] – login user {email, password},
* /users/logout – [POST] – logout user from device,
* /users/logoutall – [POST] – logout user from all devices,
* /user/me – [PATCH] – update users data {name, email, password},
* /user/me – [DELETE] – delete user,
* /user/me – [GET] – return information about authorized user
