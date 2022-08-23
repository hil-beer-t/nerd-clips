import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../services/auth.service';
import { ModalService } from './../services/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(private afAuth: AngularFireAuth,public modal: ModalService, public auth: AuthService) {

  }

  ngOnInit(): void {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

  async logout($event: Event) {
    $event.preventDefault();

    await this.afAuth.signOut()
  }

}
