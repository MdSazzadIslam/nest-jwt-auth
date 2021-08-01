import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createAccessToken(id: string): Promise<String> {
    return sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }

  async createRefreshToken(id: string) {}

  /**
   * Get all user
   * @returns
   */
  async getUsers(): Promise<User[]> {
    return await this.userModel.find({});
  }

  /**
   * Get a single user
   * @param id
   * @returns
   */

  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  /**
   * User varification
   * @param email
   * @param password
   */
  async login(email: string, password: string): Promise<User> {
    let newUser: any;
    const user = await this.userModel.findOne({ email });

    if (user != null) {
      const doMatch = await bcrypt.compare(password, user.password);
      if (doMatch) {
        const token = await this.createAccessToken(user._id);
        if (token) {
          newUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: token,
          };
        }
      }
    }
    if (!newUser) {
      throw new NotFoundException('User not found');
    }

    return newUser;
  }

  /**
   * CREATE a user
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @returns
   */
  async registration(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashPassword: string = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    return await newUser.save();
  }

  async updateUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<void> {
    const user: any = await this.userModel.findById(id).exec();
    if (user) {
      //Only modified values passed
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (password) user.password = password;

      return await user.save();
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
