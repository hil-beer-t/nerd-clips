import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnChanges, OnInit, OnDestroy {

  @Output() update = new EventEmitter

  @Input() activeClip: IClip | null = null

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Updating clip'
  alertColor = this.blue
  // --- alert properties ---

  clipId = new FormControl('')

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  editForm = new FormGroup({
    title: this.title,
    id: this.clipId
  });

  constructor(private modal: ModalService, private clipService: ClipService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip) {
      return
    }

    this.inSubmission = false
    this.showAlert = false
    this.clipId.setValue(this.activeClip.docID ?? null)
    this.title.setValue(this.activeClip.title)

  }

  ngOnDestroy(): void {
      this.modal.unregister('editClip')
  }

  ngOnInit(): void {
      this.modal.register('editClip')
  }

  async submit(){

    if(!this.activeClip){
      return
    }

    this.showAlert = true;
    this.alertColor = this.blue;
    this.alertMsg = 'Please wait! Your clip is being updated.';
    this.inSubmission = true;

    try{
      await this.clipService.updateClip(this.clipId.value ?? 'Video', this.title.value)
    }
    catch(e) {
      this.inSubmission = false
      this.alertColor = this.red
      this.alertMsg = 'Something went wrong. Try again later.'
      return
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertColor = this.green;
    this.alertMsg = 'Success';

  }

}
