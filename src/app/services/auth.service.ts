import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { delay, map, filter, Observable, switchMap, of } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

// --- firebase ---
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
// --- firebase ---

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>
  // $ -> observables
  public isAuthenticated$: Observable<boolean>
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
    ){
      this.usersCollection = db.collection('users')
      this.isAuthenticated$ = auth.user.pipe(
        // cast to boolean
        map(user => !!user)
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )

      // listen specifically to NavigationEnd event by Service
      // because the Navigation Input of component is not accessible to services
      // ?? nullish operator
      this.router.events.pipe(
        filter(
          e => e instanceof NavigationEnd),
        map(e => this.route.firstChild),
        switchMap(route => route?.data ?? of({}))
      ).subscribe(data => {
        this.redirect = data.authOnly ?? false
      })
  }

  public async createUser(userData: IUser) {

    if(!userData.password){
      throw new Error("Password not provided!")
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )

    if(!userCred.user) {
      throw new Error("User can't be found")
    }

    // conect user auth with user in firestore
    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })

    await userCred.user.updateProfile({
       displayName: userData.name
    })
  }

  public async logout($event?: Event) {

    if ($event){
      $event.preventDefault()
    }

    await this.auth.signOut()

    if(this.redirect) {
      await this.router.navigateByUrl('/')
    }
  }


}
