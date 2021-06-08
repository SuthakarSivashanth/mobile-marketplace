import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
//import { HomePage } from

@Component({
  selector: 'app-profile-photo-option',
  templateUrl: './profile-photo-option.component.html',
  styleUrls: ['./profile-photo-option.component.scss'],
})
export class ProfilePhotoOptionComponent implements OnInit {
  //navCtrl: any;

  

  constructor( private modalController: ModalController ) { }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }

  startCapture(type){
    this.modalController.dismiss(null, 'select');
  }

  /* removeModel(){
    //this.modalController.dismiss(null);
    //this.photo = image.webPath;
    //this.navCtrl.pop();
  } */

}