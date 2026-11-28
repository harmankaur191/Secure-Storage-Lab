import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/Note.js';


async function authentication(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'Missing or invalid Authorization header'})
    }

    const token = authHeader.slice(7).trim();
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();

    }catch(e){
        return res.status(401).json({message: 'Invalid or expired token'});
    }
}