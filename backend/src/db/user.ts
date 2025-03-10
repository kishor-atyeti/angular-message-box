import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },
  socket: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
},
{
  timestamps: true
}
);

export const UserModel = mongoose.model('User', userSchema);
