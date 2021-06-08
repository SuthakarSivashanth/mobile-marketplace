import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { tap, finalize } from 'rxjs/operators';
import * as firebase from 'firebase';
import {CameraResultType, CameraSource } from '@capacitor/camera';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DataAccessService } from 'src/app/services/data-access..service';
import { Plugins } from '@capacitor/core';
const { Camera } = Plugins;
import { ModalController } from '@ionic/angular';
import { ProfilePhotoOptionComponent } from '../components/profile-photo-option/profile-photo-option.component';
//import { Base64 } from '@ionic-native/base64/ngx';
import {Router} from '@angular/router';
import {AngularFirestore } from '@angular/fire/firestore';
import { UserService } from './../services/user.service';



@Component({
  selector: 'app-my-listings-add',
  templateUrl: './my-listings-add.page.html',
  styleUrls: ['./my-listings-add.page.scss'],
})
export class MyListingsAddPage implements OnInit {

  public static URL;
  public static loading;
  imageUrl;
  imageFile;
  selectedPhoto;
  listing_form: FormGroup;
  user; 
  //photo = "https://p.kindpng.com/picc/s/0-770_motif-hd-png-download.png";
  photo = "https://p.kindpng.com/picc/s/288-2881103_blank-inside-of-card-hd-png-download.png";
  profilePhoto;
  downloadUrl;
  uploading: boolean = false;
  
    // Upload Task 
    task: AngularFireUploadTask;
  
    // Progress in percentage
    percentage: Observable<number>;
  
    // Snapshot of uploading file
    snapshot: Observable<any>;
  
    // Uploaded File URL
    //UploadedFileURL: Observable<string>;
    UploadedFileURL;
  
    //File details  
    fileName:string;
    fileSize:number;
  
    //Status check 
    isUploading:boolean;
    isUploaded:boolean;
  
  constructor(
    private authSvc:AuthenticationService,
    private util:UtilService,
    private formBuilder:FormBuilder,
    private userService: UserService,
    //public camera: Camera,
    //private base64: Base64,
    private modalController: ModalController,
    private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public actionCtrl:ActionSheetController,
    private storage: AngularFireStorage, 
    private dataSvc:DataAccessService,
    private router:Router,
    public loadingCtrl: LoadingController,
    public navCtrl:NavController,
    
  ) { 

    //!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

    this.isUploading = false;
    this.isUploaded = false;

    this.listing_form = this.formBuilder.group({
      
      title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });

    this.authSvc.getUser().subscribe(user => {
     this.user = user; 
   
    });
  }

  ngOnInit() {
  }

  updateProfileImg() {
    
    let imgUrlP = this.userService.updateProfileImg(this.imageFile);
    console.log(imgUrlP);
    imgUrlP.then(snapShot => {
      console.log('The image is uploading');
      snapShot.ref.getDownloadURL()
      .then(url => {
        this.imageUrl = url;
        console.log(`An image is uploaded with url: ${this.imageUrl}`);
      })
    });
    // this.userData.userAvatarUrl = imgUrl;
  }
  uploadImage($event) {
    this.imageFile = $event.target.files[0];
    // console.log(this.imagePath);
   
  }

  /* async openActionsheet() {
    const action = await this.actionCtrl.create({
      buttons: [{
        text: 'Take a picture',
        role: 'destructive',
        cssClass: 'buttonCss',
        handler: () => {
          this.takeProfilePic(this.camera.PictureSourceType.CAMERA);
          console.log('Take a picture clicked');
        }
      }, {
        text: 'Choose a picture',
        handler: () => {
          this.takeProfilePic(this.camera.PictureSourceType.PHOTOLIBRARY);
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'buttonCss_Cancel',

        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await action.present();
  } */

 /*  async openActionsheet(){
    const modal = await this.modalController.create({
      component: ProfilePhotoOptionComponent, 
      cssClass: 'transparent-modal'
    });

    modal.onDidDismiss().then(res => {
      console.log(res);
      if(res.role !== 'backdrop'){
        this.takePicture(res.data);
      }
    });

    return await modal.present();
  } */

  /* async takeProfilePic(sourceType) {
    const options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      correctOrientation: true
    }



    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = imageData;
      this.profilePhoto = base64Image;
      this.uploadFile(base64Image);
      //console.log(this.photo)
    }, (err) => {
      // Handle error
      console.log(err)
    });


  } */

  /* async takePicture(type) {
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type]
    });
    this.photo = image.webPath;    //blob:http://localcost
    let base64Image = image.webPath; */
    //this.profilePhoto = base64Image;
    //console.log(image.webPath);
    //this. selectedPhoto = this.dataURLtoBlob('data:imagejpeg;base64, '+image.webPath);
    //this. selectedPhoto = 'data:image/jpeg;base64,' + image.webPath;
   /*  this.upload(base64Image);
  } */
  
  /*dataURLtoBlob(dataURL){
    let newbinary = btoa(dataURL.split(',')[1]);
    let binary = atob(newbinary.split(',')[1]);
    let array = [];
    for (let i=0; i<binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type:'image/jpeg'});
  };

   async upload(){
    MyListingsAddPage.loading = await this.loadingCtrl.create({
      message: 'uploading...'
    });
    await MyListingsAddPage.loading.present();

    if(this.selectedPhoto){
      var uploadtask = this.storage().ref().put(this.selectedPhoto);
      uploadtask.then(this.onSuccess, this.onError);
    }
  } */

 /*   onSuccess = snapshot =>{
    snapshot.ref.getDownloadURL().then(function(downloadURL){
      MyListingsAddPage.URL = downloadURL;
      MyListingsAddPage.loading.dismiss();
    });
    this.imgURL = MyListingsAddPage.URL;
  };

  onError = error =>{
    console.log('error',error);
  };
  
  upload(base64Image) {
    //const file = base64Image;
    const file = this.getBlob(base64Image,"image/jpeg" );
    console.log('FILE', file);
    this.isUploading = true;
    this.isUploaded = false;
    this.fileName = 'ListItem';
    const path = `images/${new Date().getTime()}_${this.fileName}.jpeg`;
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    console.log('After Upload')
    this.percentage = this.task.percentageChanges();

   this.task.snapshotChanges().pipe(
      
      finalize(() => {
        console.log('upload');
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          console.log(resp);
          this.downloadUrl = resp; 
          this.isUploading = false;
          this.isUploaded = true;
          this.uploading = false;
          this.util.toast('Picture has been successfully uploaded.', 'success', 'bottom');
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
          console.log(snap)
      })
    ).subscribe();
  }  

  private getBlob(b64Data, contentType, sliceSize:number= 512) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = btoa(b64Data);
    //let byteCharacters = atob(ecbyteCharacters);
    //let byteCharacters = decodeURIComponent(escape(atob(b64Data)));
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);  
        byteArrays.push(byteArray); 
    }
    let blob = new Blob(byteArrays, {type: contentType}); 
    return blob;
  }
 */
  onClickSave(){
    console.log(this.imageUrl)
    if(this.imageUrl){
      let listing ={
        title:this.listing_form.value.title,
        description:this.listing_form.value.description,
        price:this.listing_form.value.price, 
        photoUrl: this.imageUrl 
       }
      console.log(this.user.uid, listing)
      this.dataSvc.addListing(this.user.uid, listing).then(()=>{
        this.util.toast('Listing has been successfully added!', 'success', 'bottom');
        this.router.navigate(['./tabs/my-listings']);
      })
      .catch(err => {
        this.util.errorToast('Error in adding listing. Please try again!');
      })
    
    }
    else{
      this.util.errorToast('Please upload image before saving!');
    }
  } 

  back(){
    this.router.navigate(['./tabs/my-listings']);
  }


}