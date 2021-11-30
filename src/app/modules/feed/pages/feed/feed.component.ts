import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriarPublicacaoComponent } from '../criar-publicacao/criar-publicacao.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  bsModalRef?: BsModalRef;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  add() {
    this.bsModalRef = this.modalService.show(CriarPublicacaoComponent, this.config);
    //this.bsModalRef.content.area = fArea;
  }

}
