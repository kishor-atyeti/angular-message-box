import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../shared/component/card/card.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
