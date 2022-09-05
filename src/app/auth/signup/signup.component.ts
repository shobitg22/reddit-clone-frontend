import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup;
  signupRequestPayload:SignupRequestPayload;
  constructor(private authService:AuthService,private router: Router, private toastr: ToastrService) { 
    this.signupRequestPayload={
      userName:'',
      password:'',
      email:''
    }
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        userName:new FormControl('',Validators.required),
        email:new FormControl('',[Validators.required,Validators.email]),
        password:new FormControl('',Validators.required),
      }
    )
  }
  register(){
        this.signupRequestPayload.email=this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.userName = this.signupForm.get('userName').value;

      this.authService.singup(this.signupRequestPayload).subscribe(
        (data)=>{
          console.log(data);
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        (error)=>{console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Registration cannot be done',
            confirmButtonText:'Ok'
          })
        }
      )


  }

}
