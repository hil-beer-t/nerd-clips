import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent implements OnInit {

  id = ''

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {

    // snapshot does not reuse pervius components
    // this.id = this.route.snapshot.params.id

    // tells Angular to reuse previus components
    this.route.params.subscribe((params: Params) => {
      this.id = params.id
    })

  }

}
