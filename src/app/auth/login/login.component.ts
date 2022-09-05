import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AuthenticationResponse } from './authentication-response.payload';
import { LoginRequest } from './login-request.payload';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest:LoginRequest
  authenticationResponse:AuthenticationResponse

  loginForm:FormGroup
  isError:boolean
  registerSuccessMessage:string


  constructor(private authService:AuthService,private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequest={
      userName:'',
      password:''
    }
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })

    this.activatedRoute.queryParams.subscribe(param=>{
      if(param['registered'] !=undefined && param['registered']=='true'){
        this.toastr.success('Signup Successful');
        Swal.fire({
          icon: 'info',
          title: 'OoInformationps...',
          text: 'Please Check your inbox for activation email , activate your account before you Login!',
          confirmButtonText:'Ok'
        })
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
      }
    })
  }

  login(){
    this.loginRequest.userName=this.loginForm.get('userName').value;
    this.loginRequest.password=this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe(
      (data)=>{
        console.log(data)
        window.localStorage.setItem('authenticationToken',data.authenticationToken)
        window.localStorage.setItem('refreshToken',data.refreshToken)
        window.localStorage.setItem('userName',data.userName)
        window.localStorage.setItem('date',data.expiresAt.toString())
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');

      },
      (error)=>{console.log(error)
        this.isError = true;
      }
    )
  }

}
