import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from 'app/@core/config';
import { LocalStorageService } from 'app/@core/services/common';
import { ActivatedRoute } from '@angular/router';
import { json } from 'body-parser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;

  profile: any = {};

  constructor(
    private route: ActivatedRoute,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    // this.user_id = this.storageService.getItem(LOCALSTORAGE_KEY.user_id);
    // this.email = this.storageService.getItem(LOCALSTORAGE_KEY.email);
    // this.username = this.storageService.getItem(LOCALSTORAGE_KEY.username);
    // this.first_name = this.storageService.getItem(LOCALSTORAGE_KEY.first_name);
    // this.last_name = this.storageService.getItem(LOCALSTORAGE_KEY.last_name);
    // this.address = this.storageService.getItem(LOCALSTORAGE_KEY.address);


    this.profile = {
      user_id: this.storageService.getItem(LOCALSTORAGE_KEY.user_id),
      email: this.storageService.getItem(LOCALSTORAGE_KEY.email),
      username: this.storageService.getItem(LOCALSTORAGE_KEY.username),
      first_name: this.storageService.getItem(LOCALSTORAGE_KEY.first_name),
      last_name: this.storageService.getItem(LOCALSTORAGE_KEY.last_name),
    };

    console.log(this.profile);
    

  }

}
