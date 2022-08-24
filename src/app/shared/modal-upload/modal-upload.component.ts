import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  @Input() modalID = ''

  constructor( public modal: ModalService, public el: ElementRef) { }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement)
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
  }

  toggleModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal(this.modalID)
  }
}
