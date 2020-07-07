import { Component, OnInit } from '@angular/core';
import { SocketioService } from './core/service/socketio.service';
import { ScrollTopService } from './core/service/scroll-top.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crm-project';

  constructor(private socketService: SocketioService, private scrollTopService: ScrollTopService ) {}
  ngOnInit() {
    this.scrollTopService.setScrollTop(event);
    this.socketService.setupSocketConnection();


  }
  onActivate(event) {
    window.scroll(0,0);
    document.body.scrollTop = 0;
    document.querySelector('body').scrollTo(0,0)

}

}
