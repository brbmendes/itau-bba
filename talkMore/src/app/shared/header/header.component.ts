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
    this.messageService.showMessage("Para falar com o Itaú BBA, entre em contato no telefone 0800 570 0011", 5);
  }
}
