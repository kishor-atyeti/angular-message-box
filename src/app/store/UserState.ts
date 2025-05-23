import { Action, Selector, State, StateContext } from "@ngxs/store";
import { IUser } from "../core/models/auth.model";
import { Injectable } from "@angular/core";
import { UserService } from "../core/services/user.service";
import { tap } from "rxjs";

export class GetAllUser {
  static readonly type = '[User] Get All';
}

export class GetLoggedInUser{
  static readonly type = '[User] Get Logged In User';
}

export class SetUserLoggedOut{
  static readonly type = '[User] Unset User Store';
}

export interface UserStateModel {
  users: IUser[] | undefined;
  user: IUser | null;
}

@State<UserStateModel>({
  name: 'User',
  defaults: {
    users: [],
    user: null
  }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) { }

  @Action(GetLoggedInUser)
  getLoggedInUser(ctx: StateContext<UserStateModel>) {
    return this.userService.loggedInUser().pipe(
      tap((response)=>{
        console.log(response);
        const state = ctx.getState();
        ctx.setState({
          ...state,
          user: response.data,
        })
      })
    );
  }

  @Action(GetAllUser)
  getAllUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((response)=>{
        const state = ctx.getState();
        ctx.setState({
          ...state,
          users: response.data.filter((u)=> u._id !== state.user?._id),
        })
      })
    );
  }

  @Selector([UserState])
  static selectUsers(state: UserStateModel): IUser[] | undefined {
    return state?.users;
  }

  @Selector([UserState])
  static getLoggedUser(state: UserStateModel): IUser | null {
    return state?.user;
  }

  @Action(SetUserLoggedOut)
  setLoggedInUser(ctx: StateContext<UserStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      user: null,
    })
  }
}
