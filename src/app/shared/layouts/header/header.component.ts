import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../core/models/auth.model';
import { GetLoggedInUser, SetUserLoggedOut, UserState } from '../../../store/UserState';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isAuthenticate$!: Observable<boolean>;
  @Select(UserState.getLoggedUser) user$!: Observable<IUser>;
  store: Store = inject(Store);

  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.isAuthenticate$ = this.tokenService.isAuthentication;
  }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user) => {
        if (!user) {
          this.store.dispatch(new GetLoggedInUser());
        }
      }
    })
  }

  logout() {
    this.authService.logout().subscribe({
      next: (user) => {
        this.store.dispatch(new SetUserLoggedOut());
      }
    })
  }
}
