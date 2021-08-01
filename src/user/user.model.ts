import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    required: [true, 'Email is required'],
  },
  verified: {
    type: String,
    default: false,
  },
});

export interface User extends mongoose.Document {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
}

export interface RefreshToken extends mongoose.Document {
  id: User;
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}

export interface AccessToken extends mongoose.Document {
  id: string;
}
