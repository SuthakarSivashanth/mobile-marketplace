import { from, Observable } from 'rxjs';
import { AppUser } from './../models/AppUser';
import { UserService } from './../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataAccessService } from 'src/app/services/data-access..service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{
  default = true;
  myData$: Observable<AppUser>;
  editForm: FormGroup;
  userData: AppUser;
  allUsers; 
  imageFile;
  imageUrl;
  defaultImg = true;
  id;
  user;
  data;

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private dataSvc:DataAccessService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    ) { 
        this.id = this.userService.getUserID();
        this.authService.getUser().subscribe(user => {
        this.user = user; 
        this.dataSvc.getuserdetails(this.user.uid).subscribe(result=>{
          console.log(result)
          this.data = result;
        })
      
       });

      
    }

  ngOnInit() {
    // this.userService.getMyUsers().subscribe((data) => {
    //   console.log(data);
    //   this.allUsers = data.map(doc => {
    //     return {
    //       firstname: doc.firstname,
    //       lastname: doc.lastname,
    //       email: doc.email,
    //       phonenumber: doc.phonenumber,
    //       userAvatarUrl: doc.userAvatarUrl
    //     } as AppUser
    //   })
    // });

    this.myData$ = this.userService.getUserData();
  
    this.editForm = this.formBuilder.group({
      firstname: new FormControl('',Validators.minLength(3)),
      lastname: new FormControl('', Validators.minLength(3)),
      phonenumber: new FormControl('', Validators.maxLength(10)),
      email: new FormControl('', Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')),
      // userAvatarUrl: new FormControl('')
    });

  }

  // Sign out from the app
  signOut() {
    this.authService.SignOut()
    .then((res) => {
      this.router.navigateByUrl('/login');
      console.log('The user is sign out!');
    });
  }

  // Go to the edition page
  editProfile() {
    console.log('The user is editing profile!');
    this.default = false;
  }

  // Back to the profile page
  back() {
    this.default = true;
  }

  // Update the user details
  updateProfile(formValue) {
    if (formValue) {
      this.userData = formValue;
      // Setting imagUrl given from upload button
      this.userData.userAvatarUrl = this.imageUrl;  
      this.defaultImg = false;

      this.userService.updateUserData(this.userData);
      console.log('The user updated the profile');
      //this.resetForm(this.editForm);
      this.default = true;
    }
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

  // reset form values after updating profile
  /* private resetForm(form: FormGroup) {
    form.reset();

    Object.keys(form.controls).forEach((key) => {
      form.get(key).setErrors(null);
    })
  } */

  renderData() {
    console.log(this.id);
    // console.log(this.userService.getUserCredentials());
  }
}
