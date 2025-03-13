import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMessage, MessageType } from '../../../core/models/common.model';
import { DateAgoPipe } from '../../pipes/date-ago.pipe';
import { CommonModule } from '@angular/common';
import { NameInitialsPipe } from '../../pipes/name-initials.pipe';

@Component({
  selector: 'app-message-item',
  standalone: true,
  imports: [DateAgoPipe, NameInitialsPipe, CommonModule],
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss'
})
export class MessageItemComponent {

  @Input() data!: IMessage;
  @Input() type: MessageType = 'inbox';
  @Output() deleteMessage = new EventEmitter();

  onDelete(data: IMessage) {
    this.deleteMessage.emit(data);
  }
}
