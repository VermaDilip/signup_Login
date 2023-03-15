import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private service:ApiserviceService , private router:Router){}
  errmsg:any;
  errmsgshow = false;

  signupForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
  });

  ngOnInit(): void{

  }

  signupSubmit(){
    if(this.signupForm.valid)
    {
      console.log(this.signupForm.value,'signup##');
      this.errmsgshow=false;
      

      //callapi signup
      this.service.signup(this.signupForm.value).subscribe((res)=>{
        console.log(res,'res##');
        if(res.status==true)
        {
          this.router.navigate(['home']);
        }else
        {
          this.errmsgshow = true;
          this.errmsg = res.msg;
        }
      });
      
    }else
    {
      this.errmsgshow = true;
      this.errmsg = '**All fields required**'
      this.validationFormfield(this.signupForm);
    }
  }

  private validationFormfield(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field =>{
      const controls = formGroup.get(field);
       if ( controls instanceof FormControl){
        controls?.markAsDirty({onlySelf:true});
       }else if (controls instanceof FormGroup){
        this.validationFormfield(controls)
       }
      })
    }

  get FirstName() : FormControl{
    return this.signupForm.get("name") as FormControl;
  }

  get Email(): FormControl{
    return this.signupForm.get("email") as FormControl;
  }

  get Password(): FormControl{
    return this.signupForm.get("password") as FormControl;
  }

}
