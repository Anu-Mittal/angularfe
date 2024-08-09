import { CommonModule } from '@angular/common';
// import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { config } from 'rxjs';
import { HttpServiceService } from '../../services/http-service.service';
import { ToastrService } from 'ngx-toastr';

// import{log} from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  // imports: [FormsModule],
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // onSubmit(form:any){
  //   console.log("form submitted",form.value)
  //  message="Hello";
  loginForm!: any;
  isFormVisible: boolean = true;

  // userRole:string='admin';

  // items:string[]=['item 1','item 2','item 3','item 4'];

  constructor(
    public formbuilder: FormBuilder,
    private httpService: HttpServiceService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onLogin() {
    const data = {
      user_email: this.loginForm.value.email,
      user_password: this.loginForm.value.password,
    };
    this.httpService.loginPost(data).subscribe({
      next: (response: any) => {
        if (!response.status) {
          // console.log(response.message);
          this.toastr.error(response.message);
          return;
        }
        localStorage.setItem('token', response.data.token);
        this.toastr.success("Logged In Successfully");
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message);
      },
    });
  }
}
