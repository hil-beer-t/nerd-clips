
import { AuthService } from './../services/auth.service';
import { ModalService } from './../services/modal.service';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  enIsActive: boolean = false; // language is active
  ptIsActive: boolean = true; // language is active

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    public themeService: ThemeService,
    public translate: TranslateService
    ) {

  }

  ngOnInit(): void {
  }

  openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal('auth')
  }

  toggleTheme($event: Event) {
    $event.preventDefault()
    const active = this.themeService.getActiveTheme() ;
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }

  toggleLang($event: Event, lang: string) {
    $event.preventDefault()

    if (lang === 'en') {
      this.ptIsActive = false
      this.translate.use('en')
      this.enIsActive = true
    } else {
      this.enIsActive = false
      this.translate.use('pt')
      this.ptIsActive = true
    }

  }

}

