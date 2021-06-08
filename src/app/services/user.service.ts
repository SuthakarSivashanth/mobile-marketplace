import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AppUser } from './../models/AppUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class UserService {
  private usersDB: AngularFirestoreCollection<AppUser>;
  private usersDB$: Observable<AppUser[]>;
  private userfilesDB: AngularFireStorage;
  // storage = firebase.storage()

  constructor(
    private db: AngularFirestore,
    private authService: AuthenticationService,
    private afs: AngularFireStorage,
    ) {
      this.usersDB = this.db.collection<AppUser>('users');
      this.usersDB$ = this.usersDB.valueChanges();
      this.userfilesDB = this.afs;
    }

    // Add a new user when registering is worked!
    addUser(uid: string) {
      this.usersDB.doc(`${uid}`).set({
        firstname: 'Your firstname',
        lastname: 'Your lastname',
        phonenumber: 'Your phonenumber',
        userAvatarUrl: '',
        email: 'Your email address', 
      })
      .then(() => {
        console.log(`User is created with: ${uid} and database is created!`);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });

    }

    // Update user Data via editing form
    updateUserData(userData: AppUser) {
      // Add user data
      console.log(userData);
      let passedValues = this.filterValues(userData);
      console.log(passedValues);
      this.usersDB.doc(`${this.getUserID()}`).update(passedValues)
        .then(() => {
          console.log('User Data is updated in the database!');
        })
        .catch((error) => {
          console.log('Error is occurred: ', error);
        });
    }

    // Filter the values entered by the user
    private filterValues(obj) {
      for (let prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '')
          delete obj[prop];
      }
      return obj;
    }

    updateProfileImg(image) {
      let uid = this.getUserID();
      return this.userfilesDB.upload(`/${uid}/profileImg-${Date.now()}`, image);
    }

    getMyUsers(): Observable<AppUser[]> {
      return this.usersDB$;
    }

    // Get a particular user data
    getUserData(): Observable<AppUser> {
      let uid = this.getUserID();
      return this.usersDB.doc(`${uid}`).valueChanges();
    }

    getUserFilesDB() {
      return this.userfilesDB;
    }

    // get the stored local storage data
    getUserCredentials() {
      return JSON.parse(localStorage.getItem('user'));
    }

    getUserID() {
      return JSON.parse(localStorage.getItem('user')).uid;
    }

    test() {

    }
  

  
}
