import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ProductService, Product, UserService, User, CommentService, Comment as Comments } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgControlStatusGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

    product: Product;
    slug: string | null;

    currentUser: User;
    user_image: string | null;
    canModify: boolean;
    comments: Comments[];
    commentControl = new FormControl();
    commentFormErrors = {};
    isSubmitting = false;
    isDeleting = false;

    constructor(
        private ProductService: ProductService,
        private UserService: UserService,
        private CommentService: CommentService,
        private ActivatedRoute: ActivatedRoute,
        private router: Router,
        private ToastrService: ToastrService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
        this.get_product();
    }

    get_product() {
        /*  console.log(this.slug); */
        if (typeof this.slug === 'string') {
           this.ProductService.get_product(this.slug).subscribe({
                next: data => {
                    this.product = data;
                    // this.images = data.product_image;
                    /* console.log(this.images); */
                    // Load the comments on this article
                    this.get_comments();
                    this.get_user_author();
                    this.cd.markForCheck();
                },
                error: e => { 
                    this.ToastrService.error("Product not found");
                    console.log(e);
                    this.router.navigate(['/']);
                }
            })
        }
    }

    get_user_author() {
        this.UserService.currentUser.subscribe((userData: User) => {
            this.currentUser = userData;
            this.user_image = userData.image;
            // console.log(this.product);
            // console.log(this.currentUser.username)
            // this.canModify = String(this.currentUser.username) === String(this.product.author?.username);
            this.cd.markForCheck();
        });
    }

    get_comments() {
        if (this.product.slug) {
            this.CommentService.getAll(this.product.slug).subscribe((comments) => {
                this.comments = comments;
                this.cd.markForCheck();
            });
        }
    }

    create_comment() {
        this.isSubmitting = true;
        this.commentFormErrors = {};
        if (this.product.slug) {
            const commentBody = this.commentControl.value;
            this.CommentService.add(this.product.slug, commentBody).subscribe({
                next: data => {
                    this.ToastrService.success("Comment added successfully");
                    this.commentControl.reset('');
                    this.isSubmitting = false;
                    this.cd.markForCheck();
                    this.comments.push(data);
                },
                error: error => {
                    this.ToastrService.error("Comment add error");
                    this.isSubmitting = false;
                    this.commentFormErrors = error;
                    this.cd.markForCheck();
                }
            })
        }
    }

    delete_comment(comment: Comments) {
        if (this.product.slug) {
            this.CommentService.destroy(comment.id).subscribe({
                next: data => {
                    console.log(data.type);
                    if (data.type == 'success') {
                        this.ToastrService.success("Comment deleted");
                        this.comments = this.comments.filter((item) => item !== comment);
                        this.cd.markForCheck();
                    }
                },
                error: error => { 
                    this.ToastrService.error(error.msg);
                }
            })
        }
    }
}