import mongoose from "mongoose";
import express from 'express';
import User from '../models/User.js'
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/users/register', async(req, res)=>{

   try{
        
        const newUser = await User.create(req.body);
        
        if(!newUser){
            return res.status(400).json({message:"enter valid username or email"})
        }
        const userResponse = newUser.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    }catch(e){
        if(e.code === 11000){
            return res.status(400).json({message:"username or email already in use"});
        }
        if(e.name === 'ValidationError'){
            return res.status(400).json({message: e.message});
        }
       return res.status(500).json(e.message);
    }

});

router.post('/users/login', async (req, res)=>{

    try{
        if(!req.body.email || !req.body.password){
            throw new Error('Incomplete Data from request.');
        }
        const user = await User.findOne({email: req.body.email.toLowerCase().trim()})
        if(!user){
            return res.status(400).json({message:"Incorrect email or password"})
        }
        const correctPw = await user.isCorrectPassword(req.body.password);
        if(!correctPw){
            return res.status(400).json({message: "Incorrect email or password"});
        }

        const payload ={
            _id: user._id,
            username:user.username,
            email: user.email
        };
        const token =jwt.sign({data: payload}, secret, {expiresIn: expiration});
        console.log(token);
        return res.json({token, user:payload});
    }catch(e){
        return res.status(400).json(e.message);
    }
});

export default router;