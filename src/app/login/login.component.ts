import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  constructor(private http: HttpClient,private form: FormBuilder,private successpg:Router,private failpg:Router) { }
  ngOnInit(){
  this.loginForm = this.form.group({
    name: ['', [Validators.required] ],
    password: ['',[Validators.required]],
 });
  }
  title = 'Login Form';
  nam:any={};
  pwd:any={};
  detail:any=[];
  name="";
  c:number;
  i:number;
  password:any;
  
  onSubmit(details) {
    console.log(details)
    this.http.get('http://localhost:7000')
    .subscribe((res) => {
      this.detail= res;
     
   
      this.c=0;
    // console.log(this.loginForm.value.name,this.loginForm.value.password);
    // console.log(this.detail[1].name);
    console.log(this.detail[0]);
    // console.log(this.detail)
    // for(this. i=0;this.i<this.detail[0].length;this.i++){
      
      for(this. i=0;this.i<this.detail.length;this.i++){
    // console.log(this.loginForm.value.name)
    //  if((details.name==this.detail[0][this.i].Name)&&(details.password==this.detail[0][this.i].Password))
    if((details.name==this.detail[this.i].Name)&&(details.password==this.detail[this.i].Password))
    {
      this.c=1;
      break;
    }}
 
  console.log(this.c)
    if(this.c==1){
      this.successpg.navigate(["userdetails"]);
    }
    else{
      this.failpg.navigate(["fail"]);
    }
  }, error => {
    console.log(error);
   });
    // f.reset()
  
  }
}


