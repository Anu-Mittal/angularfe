import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { Validator } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: any;
  constructor(private formbuilder: FormBuilder) {

  }
  ngOnInit() {
    this.initializeForm()
  }


  initializeForm() {
    this.signupForm = this.formbuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      // age:['', [Validators.required,Validators.min(1),Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
     });
  }


  submitForm() {
    if (this.signupForm.valid) {
      console.log("form is submitted", this.signupForm.value);

    }
  }

}

