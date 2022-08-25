import { FfmpegService } from './../../services/ffmpeg.service';
import { Router } from '@angular/router';
import { ClipService } from './../../services/clip.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, combineLatest, forkJoin } from 'rxjs';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnDestroy, OnInit {

  screenshots: string[] = []

  selectedScreenshot = ''
  screenshotTask?: AngularFireUploadTask

  // colors
  red = 'rgb(248 113 113)'
  green = 'rgb(74 222 128)'
  blue = 'rgb(34 211 238)'

  // deny button while submitting
  inSubmission = false

  // --- alert properties ---
  showAlert = false
  alertMsg = 'Please wait! Your account is being created'
  alertColor = this.blue
  // --- alert properties ---

  // upload settings
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  percentage = 0;
  showPercentage = false;
  // upload settings

  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.title,
  });

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router,
    public ffmpeg: FfmpegService
  ) {
    auth.user.subscribe((user) => (this.user = user));
    this.ffmpeg.init()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }

  async storeFile($event: Event) {

    if(this.ffmpeg.isRunning) {
      return
    }

    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.screenshots = await this.ffmpeg.getScreenshots(this.file)

    this.selectedScreenshot = this.screenshots[0]

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  async uploadFile() {

    this.uploadForm.disable();
    this.showAlert = true;
    this.alertColor = this.blue;
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    const screenshotBlob = await this.ffmpeg.blobFromURL(
      this.selectedScreenshot
    )

    const screenshotPath = `screenshots/${clipFileName}.png`

    try {
      this.task = this.storage.upload(clipPath, this.file);
      const clipRef = this.storage.ref(clipPath);

      this.screenshotTask = this.storage.upload(screenshotPath, screenshotBlob)

      const screenshotRef = this.storage.ref(screenshotPath)

      combineLatest([
        this.task.percentageChanges(),
        this.screenshotTask.percentageChanges()
      ]).subscribe((progress) => {
        const [clipProgress, screenshotProgress] = progress

        if (!clipProgress || !screenshotProgress) {
          return
        }

        const total = clipProgress + screenshotProgress

        this.percentage = (total as number) / 200;
      });

      forkJoin([
        this.task.snapshotChanges(),
        this.screenshotTask.snapshotChanges()
      ])
        .pipe(
          switchMap(() => forkJoin([
            clipRef.getDownloadURL(),
            screenshotRef.getDownloadURL()
          ]))
        )
        .subscribe({
          next: async (urls) => {

            const [clipURL, screenshotURL] = urls

            const clip = {
              uid: this.user?.uid as string,
              displayName: this.user?.displayName as string,
              title: this.title.value,
              fileName: `${clipFileName}.mp4`,
              url: clipURL,
              screenshotURL: screenshotURL,
              screenshotFileName: `${clipFileName}.png`,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };

            const clipDocRef = await this.clipsService.createClip(clip);

            console.log(clip);

            this.alertColor = this.green;
            this.alertMsg = 'Success! Your clip has been uploaded.';
            this.showPercentage = false;

            setTimeout(() => {
              this.router.navigate([
                'clip', clipDocRef.id
              ]);
            }, 1000);
          },
          error: (error) => {
            this.uploadForm.enable();
            this.alertColor = this.red;
            this.alertMsg = 'Error! Your clip could not be uploaded.';
            this.inSubmission = true;
            this.showPercentage = false;
            console.log(error);
          },
        });
    } catch (error) {
      console.log(error);
    }
  }

}
