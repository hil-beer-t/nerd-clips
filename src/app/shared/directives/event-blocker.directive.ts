import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]'
  // must be a valid css selector
})
export class EventBlockerDirective {

  // arg1: name of the event
  // arg2: $event from HostListener
  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event){
    event.preventDefault()
  }

}
