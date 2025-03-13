import { Component, Input } from '@angular/core';
import { IMessage } from '../../../core/models/common.model';
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


}
