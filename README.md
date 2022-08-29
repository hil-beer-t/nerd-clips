# [Nerd Clips]()

![image](https://user-images.githubusercontent.com/52302576/187304122-c15d1bd5-28f4-4a13-a101-c9fa29b1d052.png)

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Features](#features)
- [Built with](#built_with)
- [Vercel deploy](#vercel)
- [Acknowledgment](#acknowledgment)

## About <a name = "about"></a>

Angular project of a Video Platform. You can watch video of other users, and if you are registered, you can upload & edit your own videos.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Features <a name = "features"></a>

- Watch videos (ffmpeg)
- Upload/Edit/Delete `your` own videos (ffmpeg/firebase)
- Infinite scrool
- Login/Register (firebase)
- Dark/Light mode
- Switch language button

### Prerequisites

What things you need:

- [Npm](https://www.npmjs.com/package/download)
- [Angular](https://angular.io/guide/setup-local)

Create a project:

- [Firebase](https://firebase.google.com/)

### Installing

A step by step series of examples that tell you how to get a development env running.

Git clone

```bash
git clone https://github.com/hil-beer-t/nerd-clips.git
```

At `Firebase Auth` console Enable `Email/Password` Authentication.
<br>

![image](https://user-images.githubusercontent.com/52302576/187288718-520a0de3-7e08-4a44-9243-b72f8425fc74.png)

Add these rules below to your `Firebase storage`

```ts
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth!=null &&
      			(
            	request.resource.contentType == 'video/mp4'
              ||
              request.resource.contentType == 'image/png'
            ) &&
            request.resource.size < 45 * 1000 * 1000;
      allow delete: if request.auth!=null;

    }
  }
}
```

and these rules to your `Firestore Database`

```ts
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.uid;
    	allow delete: if request.auth.uid == resource.data.uid;
      allow create: if request.auth.uid != null;
    }
  }
}
```

Copy your `Firebase` credentials from `{your-app-name}/Project settings/SDK setup and configuration/npm` and past at `environment.ts`

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "{your-api-key}",
    authDomain: "{your-domain}", // e.g: "nerd-clips.firebaseapp.com"
    projectId: "{your-app-name}", // e.g: "nerd-clips"
    storageBucket: "{{your-app-name}.appspot.com}",
    //messagingSenderId: "123456789",
    appId: "{your-app-id}",
  },
};
```

and `environment.prod.ts`

```ts
export const environment = {
  production: true,
  firebase: {
    apiKey: "{your-api-key}",
    authDomain: "{your-domain}", // e.g: "nerd-clips.firebaseapp.com"
    projectId: "{your-app-name}", // e.g: "nerd-clips"
    storageBucket: "{{your-app-name}.appspot.com}",
    //messagingSenderId: "123456789",
    appId: "{your-app-id}",
  },
};
```

Check if you're inside the root folder and install npm dependencies

```bash
npm i
```

Run angular server

```bash
ng s
```

Output

```bash
...
Initial Chunk Files | Names   |  Raw Size
main.js             | main    | 296.48 kB |
runtime.js          | runtime |  13.25 kB |

4 unchanged chunks

Build at: 2022-08-29T19:19:30.003Z - Hash: ffb1e3f43d200439 - Time: 582ms

√ Compiled successfully.
```

Open the browser at this url:

```
http://localhost:4200/
```

## Built with <a name = "built_with"></a>

- [Angular](https://angular.io/guide/setup-local)
- [Firebase](https://firebase.google.com/)
- [Ffmpeg](https://ffmpeg.org/)
- [ngx-translate](https://github.com/ngx-translate/core)

## Vercel deploy <a name = "vercel"></a>

[https://rust-web-assembly-nine.vercel.app/](https://rust-web-assembly-nine.vercel.app/)

<br>

## Acknowledgment <a name = "acknowledgment"></a>

I am really thankful to [@luisramirezjr](https://www.udemy.com/user/luisramirezjr/) and his teachings.
