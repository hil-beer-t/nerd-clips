import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { delay, map, Observable } from 'rxjs';

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

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore
    ){
      this.usersCollection = db.collection('users')
      this.isAuthenticated$ = auth.user.pipe(
        // cast to boolean
        map(user => !!user)
      )
      this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
        delay(1000)
      )
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


}
