"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const request = supertest(server.app);

describe('Server API Test',()=>{
    it('SignUp test',async()=>{
        const data=await request.post('/signup').send({
            username:"ahmad12",
            password:"test@123"
        });
        expect(data.status).toEqual(200);
    });

    it('SignIn',async()=>{
        const data=await request.post('/signin').auth('ahmad12','test@123');
        expect(data.status).toEqual(200);
    });

    it('SignIn Middleware not access',async()=>{
        const data=await request.post('/signin').auth('ahmad1','test@123125');
        expect(data.status).toEqual(403);
    });

    it('SignUp , SignIn',async()=>{
        const reqObj=await request.post('/signup').send({
            username:'Qusi1',
            password:'test123'
        });
        const data=await request.post('/signin').send({
            username:'Qusi1',
            password:'test123'
        }).auth(reqObj.body.username,'test123');
        expect(data.status).toEqual(200);
    })
})