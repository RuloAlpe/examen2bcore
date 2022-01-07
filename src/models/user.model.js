import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import database from '../database/con';

// User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  rol: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
