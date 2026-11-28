import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import User from "./User.js";


const noteSchema = new Schema({
    title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
},

  timestamps: true


});

const Note = model('Note', noteSchema);
 
export default Note;