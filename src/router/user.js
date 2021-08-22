"use strict";

const express=require('express');
const bcrypt =require('bcrypt');
const base64=require('base-64');
const {users}=require('../models/index');
const basicAuth=require('../middleware/basicAuth');
const router=express.Router();

router.post('/signup',signUp);
router.post('/signin',basicAuth,signIn);


async function signUp(req,res){
    try {
        req.body.password=await bcrypt.hash(req.body.password,10);
        // const user=new users(req.body);
        const record=await users.create({
            username : req.body.username,
            password: req.body.password
        });
        res.json(record);
    } catch (error) {
        console.log(error);
        res.status(403).send("can not create a user!!");
    }
}

async function signIn(req,res){
    res.status(200).json(req.user);
}


module.exports=router;