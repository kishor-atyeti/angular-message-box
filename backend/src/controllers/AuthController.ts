import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../_helpers/validators';
import bcrypt from 'bcrypt';
import { UserModel } from '../db/user';
import { generateToken } from '../middleware/authenticate';
import { IRequest, IUser } from '../models/common.model';

class AuthController {

  public async login(request: Request, response: Response) {

    try {
      const { email, password } = request.body;
      loginSchema.parse({ email, password });

      let user = await UserModel.findOne({ email });

      if (!user) {
        response.status(400).json({ status: false, message: "Invalid user" });
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        response.status(401).json({ status: false, message: "Invalid credentials" });
        return;
      }
      const data: IUser = {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        token: '',
      }
      const token = generateToken(data);
      user.token = data.token = token;
      await user.save();

      response.status(201).json({ status: true, message: "User loggedin successfully", data: data });
      return;

    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }

  public async register(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      registerSchema.parse({ name, email, password });

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new UserModel({
        name,
        email,
        password: hashPassword
      });

      await user.save();

      response.status(201).json({ message: "User is created" });
      return;

    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }

  public async me(request: IRequest, response: Response) {
    try {
      const email = request.user?.email;
      const user = await UserModel.findOne({
        email
      });

      if (user) {
        const data: IUser = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
        }

        response.status(201).json({ data: data });
        return;
      }
    } catch (error) {
      response.status(400).json({ message: "Something went wrong" });
      return;
    }
  }

  public async logout(request: IRequest, response: Response) {
    try {
      const email = request.user?.email;
      const user = await UserModel.findOne({
        email
      });

      if (user) {
        user.token = null;
        await user.save();

        response.status(200).json({ message: "User logout successfully" });
        return;
      }
      response.status(400).json({ message: "User not found" });
      return;
    } catch (error) {
      response.status(400).json({ message: "Something went wrong" });
      return;
    }
  }
}

export default new AuthController();
