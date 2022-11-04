import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService, Profile, ProfileService } from '../core';
import { concatMap, tap } from 'rxjs/operators';
// import { SharedModule } from '../shared/shared.module';
  
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit {
    profile: Profile = {} as Profile;
    currentUser: User = {} as User;
    isUser: boolean = false;
  
    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private cd: ChangeDetectorRef,
      private profileService: ProfileService,
    ) {}
  
    ngOnInit() {
        this.clickChangeProfile();
        // console.log(this.ActivatedRoute.data);
        this.route.data.pipe(
            concatMap((data: any) => {
              console.log(data);
              this.profile = data.profile;
              /* console.log(this.profile)
              console.log(this.profile.valoration) */
              // Load the current user's data.
              return this.userService.currentUser.pipe(
                tap((userData: User) => {
                  this.currentUser = userData;
                  this.isUser = this.currentUser.username === this.profile.username;
                })
              );
            })
          )
        .subscribe(() => {
            this.cd.markForCheck();
        });
    }

    onToggleFollowing(following: boolean) {
        this.profile.following  = following;
    }
    
    clickChangeProfile() {
        this.route.params.subscribe((profile) => {
            this.profileService.get(profile.username).subscribe(
                (data) => {
                    this.profile = data;
                    console.log(this.profile);
                    // this.isUser = this.currentUser.username === this.profile.username;
                    // this.cd.markForCheck();
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }
}