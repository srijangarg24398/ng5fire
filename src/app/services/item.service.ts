import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../models/Item';

@Injectable()
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  constructor(public afs: AngularFirestore) {
    // this.items=this.afs.collection('posts').valueChanges();
  	this.itemsCollection=this.afs.collection('posts',ref=>ref.orderBy("title","asc"));
  	this.items=this.itemsCollection.snapshotChanges().map(changes=>{
  		return changes.map(a => {
        	const data=a.payload.doc.data() as Item;
        	data.id=a.payload.doc.id;
        	return data;
      });
  	})
  }
  getItems(){
  	return this.items;
  }
  addItem(item:Item){
    this.itemsCollection.add(item);
  }
  deleteItem(item:Item){
    this.itemDoc=this.afs.doc(`posts/${item.id}`)
    this.itemDoc.delete();
  }
  updateItem(item:Item){
    this.itemDoc=this.afs.doc(`posts/${item.id}`)
    this.itemDoc.update(item);
  }
}
