import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/component/card/card.component';
import { SidebarComponent } from '../../shared/layouts/sidebar/sidebar.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../core/models/auth.model';
import { Observable } from 'rxjs';
import { GetAllUser, GetLoggedInUser, UserState } from '../../store/UserState';
import { Select, Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../core/services/message.service';
import { GetAllMessages } from '../../store/MessageState';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from '../../core/services/socket.service';

@Component({
  selector: 'app-compose',
  standalone: true,
  imports: [CardComponent, SidebarComponent, ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.scss'
})
export class ComposeComponent implements OnInit {

  @Select(UserState.getLoggedUser) user$!: Observable<IUser>;
  @Select(UserState.selectUsers) users$!: Observable<IUser[]>;

  fb: FormBuilder = inject(FormBuilder);
  store: Store = inject(Store);
  messageService: MessageService = inject(MessageService);
  composeForm: FormGroup;
  toastr: ToastrService = inject(ToastrService);
  socketService: SocketService = inject(SocketService);
  router: Router = inject(Router);

  constructor() {
    this.composeForm = this.fb.group({
      to: new FormControl('', [Validators.required]),
      sender: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.user$.subscribe({
      next: (user) => {
        if (!user) {
          this.store.dispatch(new GetLoggedInUser());
        }
        this.composeForm.patchValue({
          sender: user._id
        });
      }
    })
    this.store.dispatch(new GetAllUser());
  }

  sendMessage() {
    console.log(this.composeForm.value);
    if(this.composeForm.valid) {
      this.messageService.sentMessage(this.composeForm.value).subscribe({
        next: (response) => {
          this.store.dispatch(new GetAllMessages());
          this.toastr.success(response.message);
          this.socketService.sentMessage('working');
          this.router.navigate(["/messages/sent"]);
        }
      })
    }
  }

}
