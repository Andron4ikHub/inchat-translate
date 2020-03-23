import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {

  constructor(private http: HttpClient, private db: AngularFirestore, private afAuth: AuthService) { }
  dbRef = this.db.collection('users');
  currentUser = this.afAuth.Auth.auth.currentUser;

  async listFriends(uID: string){
   // not reactive, but works, wont update with added friends
    var friends = await this.dbRef.doc(uID).ref.get().then(doc => {
      console.log(doc.data());
      return doc.data().user.friends;
    });

    // Dynamic as per "valueChanges()," automatically updates when friends are added
    /*
    var friends = await this.dbRef.doc(uID).valueChanges().subscribe(doc => {
      console.log(doc);
      return doc.data().user.friends;
      });
    return friends;
    */
    return friends;
  }

  deleteFriend(uID: string, fID: string){
    this.dbRef.doc(uID).update(
      { 'user.friends': firebase.firestore.FieldValue.arrayRemove(fID)}).then(() => 
        console.log(uID + " removed friend " + fID));
    alert(fID + " removed");
    return true;
  }

  addFriend(uID: string, fID: string){
    this.dbRef.doc(uID).update(
      { 'user.friends': firebase.firestore.FieldValue.arrayUnion(fID)}).then(() => 
        console.log(uID + " added friend " + fID));
    alert(fID + " added");
    return true;
  }

}
