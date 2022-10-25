import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { JwtService } from 'src/app/core';
import { Router } from '@angular/router';
import { UserService, User } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  user: User = {} as User;
  current_user: User;
  is_loged: Boolean = false;

  constructor(
    private JwtService: JwtService,
    private UserService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.UserService.currentUser.subscribe(
      (userData) => {
        if (userData.username) {
          this.current_user = userData;
          this.is_loged = true;
          this.cd.markForCheck();
        } else {
          this.is_loged = false;
        }
      }
    );
  }

  logout() {
    this.UserService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}