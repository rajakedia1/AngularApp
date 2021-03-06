import { Component, OnInit, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import {MatSliderModule} from '@angular/material/slider';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { ratingValue } from '../shared/comment';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

import { visibility, flyInOut, expand } from '../animations/app.animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display:block'
    },
    animations: [
        flyInOut(),
        visibility(),
        expand()
    ]
})
export class DishdetailComponent implements OnInit {
    
    dish: Dish;
    dishcopy = null;
    dishIds: number[];
    prev: number;
    next: number;
    errMess: string;
    comments: Comment;
    
    ratingvalue = ratingValue;
    
    visibility = 'shown';
    
    commentForm: FormGroup;
    formErrors = {
        'author':'',
        'comment':''
    };
    
    validationMessages = {
        'author':{
            'required': 'Author Name is required.',
            'minlength': 'Author Name must be atleast 2 character long.',
            'maxlength': 'Author Name cannot be more than 25 character'
        }, 
        'comment': {
          'required': 'Comment is required.'
        },
    };
    
  constructor(private dishservice: DishService, private route: ActivatedRoute, private location: Location, private fb: FormBuilder,@Inject('BaseURL') private BaseURL) { 
    
  }

  ngOnInit() {
      /* without observable 
      let id = +this.route.snapshot.params['id'];
      this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
      */
      this.createForm();
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']);})
          .subscribe(dish => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';}, errmess => this.errMess = <any>errmess);
      
      
  }
    
    goBack(): void {
        this.location.back();
    }
    
    setPrevNext(dishId: number){
        let index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
    
    
    
    
    
    createForm(){
        this.commentForm = this.fb.group({
            rating: 3,
            comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            date: new Date()
            
            
        });
        
        this.commentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        
        this.onValueChanged(); //reset form validation
    }
    
    onValueChanged(data?: any){
        if(!this.commentForm) { return ;}
        const form = this.commentForm;
        
        for(const field in this.formErrors){
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
            
        }
    }
    
    onSubmit(){
        this.comments = this.commentForm.value;
        console.log(this.comments);
        console.log(typeof(this.comments));
        console.log(typeof(this.dish.comments));
        this.dishcopy.comments.push(this.comments);
        this.dishcopy.save().subscribe(dish => this.dish = dish);
        this.commentForm.reset({
            author: '',
            comment: '',
            rating: 3,
            date: ''
        });
    }


}
