import { Request } from "express";

export interface IUser {
  _id: string,
  name: string,
  email: string,
  token?: string
}

export interface IRequest extends Request {
  user?: IUser;
}
