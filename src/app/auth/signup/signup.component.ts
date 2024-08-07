import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import {FormGroup ,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';

// import { Validator } from '@angular/forms';
import { config } from 'rxjs';
import { HttpServiceService } from '../../services/http-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: any;
  isFormVisible: boolean = true;

  constructor(private formbuilder: FormBuilder,private httpService: HttpServiceService,private route : Router) {


  }
  ngOnInit(){
    this.signupForm = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      // age:['', [Validators.required,Validators.min(1),Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // gender: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      // country: ['', [Validators.required]],
      // state: ['', [Validators.required]],
      // city: ['', [Validators.required]],
      // contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
     });
  }


  onSignup() {
    // if (this.signupForm.valid) {
    //   console.log("form is submitted", this.signupForm.value);

  
    const data = {
      firstName:this.signupForm.value.firstname,
      lastName:this.signupForm.value.lastname,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    this.httpService.signupPost(data).subscribe({
      next: (response: any) => {
        // if (!response.status) {
          console.log(response);
          if(!response.status){
            console.log(response.message);
            return
          }
          this.route.navigate(['login']);
          // return;
        // }
        // localStorage.setItem('token', response.data.token);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}

