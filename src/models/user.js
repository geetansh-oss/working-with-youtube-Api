import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: { 
    type: String, 
    required: [true, "Email is Required"],
    unique: [true, "Email already exist"]  
  },
  userName: { 
    type: String, 
    required: [true, "UserName is Required"],
  },
  image: { 
    type: String 
  }
})

const User = models.User || model('User', userSchema);

export default User;