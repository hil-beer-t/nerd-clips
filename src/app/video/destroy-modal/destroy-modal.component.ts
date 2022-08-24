import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-destroy-upload',
  templateUrl: './destroy-modal.component.html',
  styleUrls: ['./destroy-modal.component.css']
})
export class DestroyModalComponent implements OnInit {

  constructor(private modal: ModalService) { }

  ngOnDestroy(): void {
    this.modal.unregister('destroy')
  }

  ngOnInit(): void {
    this.modal.register('destroy')
  }

}
