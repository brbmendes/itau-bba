import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  logout() {
    // reset login status
    // this.loginService.logout();
  }

  showAjuda(){
    this.messageService.showMessage("Teste", 5);
  }
}
