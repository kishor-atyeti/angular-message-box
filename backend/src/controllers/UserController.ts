import {Request, Response} from 'express'
import { UserModel } from '../db/user';


class UserController {

  public async getAllUsers(request: Request, response: Response) {

    try {
      const users = await UserModel.find();
      response.status(200).json({ data: users });
      return;
    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }
}

export default new UserController();
