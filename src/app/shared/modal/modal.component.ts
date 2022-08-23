import { ModalService } from './../../services/modal.service';
import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

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
