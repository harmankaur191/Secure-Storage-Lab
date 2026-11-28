import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/Note.js';



const router = express.Router;
const secret = process.env.JWT_SECRET;

