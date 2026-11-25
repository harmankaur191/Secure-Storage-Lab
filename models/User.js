import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,

    }
});

userSchema.pre("save", async function (next) {
  console.log('Initial password'+this.password);
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log('Hashed Password:'+ this.password);  
  
  }
  });

  userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const User = model("User", userSchema);
 
export default User;