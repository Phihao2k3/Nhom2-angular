import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_KEY, ROUTER_CONFIG } from 'app/@core/config';
import { LocalStorageService } from 'app/@core/services/common';
import { ActivatedRoute } from '@angular/router';
import { json } from 'body-parser';
import { UserService } from 'app/@core/services/apis/user.service';

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
  id: number;

  constructor(
    private route: ActivatedRoute,
    private storageService: LocalStorageService,
    private user_service: UserService
  ) {
    this.id = this.storageService.getItem(LOCALSTORAGE_KEY.user_id);
    
    this.user_service.getUserById(this.id).subscribe((data) => {

      let user = data.users[0];

      this.profile = { 
        username: user.username,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };

    });
  }

  ngOnInit(): void {
   
  }

}
