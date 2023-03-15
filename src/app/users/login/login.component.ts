import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private service:ApiserviceService, private router:Router){}
  errmsg:any;
  errmsgshow =false;


  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });

  loginSubmit(){
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value,'loginvalue##');
      this.service.login(this.loginForm.value).subscribe((res)=>{
        if(res.status==true)
        {
          console.log(res,'resss');
          //store data in localStorage
          localStorage.clear();
          localStorage.setItem('token',res.token);
          localStorage.setItem('username',res.result.name);
          this.router.navigate(['home']);

        }else
        {
          this.errmsgshow=true;
          this.errmsg = res.msg;
        }
      })
      //this.errmsgshow=false;
    }else
    {
      this.errmsgshow=true;
      this.errmsg = '**All fields required**';
    }
  }

}
