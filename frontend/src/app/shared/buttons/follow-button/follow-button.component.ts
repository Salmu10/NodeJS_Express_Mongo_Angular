import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ProfileService, UserService } from 'src/app/core';
import { concatMap , tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FollowButtonComponent implements OnInit {

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {}

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  
  isSubmitting = false;

  ngOnInit(): void { }

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.ToastrService.error("Login for follow");
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 3000);
          // this.router.navigateByUrl('/login');
          // return of(null);
        }

        // Follow this profile if we aren't already
        if (!this.profile.following) { 
          return this.profileService.follow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
        ));

        // Otherwise, unfollow this profile
        } else {
          return this.profileService.unfollow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
  }
}