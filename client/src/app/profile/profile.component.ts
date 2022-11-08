import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      private router: Router,
      private userService: UserService,
      private cd: ChangeDetectorRef,
      private profileService: ProfileService,
    ) {}
  
    ngOnInit() {
        this.get_profile();
    }

    get_profile() {
        this.route.data.subscribe({
            next: data => {
                this.profile = data['profile'] as Profile;
                this.userService.currentUser.subscribe({
                    next: data => {
                        this.isUser = (data.username === this.profile.username);
                        this.cd.markForCheck();
                    },
                    error: e => console.error(e)
                });
            },
            error: e => console.error(e)
        });
    }

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }

    onToggleFollowing(following: boolean) {
        this.profile.following  = following;
    }
}