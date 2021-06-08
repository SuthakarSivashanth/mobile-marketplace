
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() { 
  }

  ngOnInit() {
  }

  
}
