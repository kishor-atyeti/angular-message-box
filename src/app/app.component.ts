import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './core/services/socket.service';
import { Store } from '@ngxs/store';
import { GetAllMessages } from './store/MessageState';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng17-message-box';

  socketService: SocketService = inject(SocketService);
  store: Store = inject(Store);

  ngOnInit(): void {
    this.socketService.getMessages().subscribe({
      next: (response) => {
        this.store.dispatch(new GetAllMessages());
      }
    });
  }
}
