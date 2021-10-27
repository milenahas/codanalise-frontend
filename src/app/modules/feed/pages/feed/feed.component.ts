import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CriarPublicacaoComponent } from '../../components/criar-publicacao/criar-publicacao.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  add() {
    this.bsModalRef = this.modalService.show(CriarPublicacaoComponent);
    //this.bsModalRef.content.area = fArea;
  }

}
