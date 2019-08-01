import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private regform:Router) {
   
  }
  
  ngOnInit() {
    // this.regform.navigate(["userdetails"]);
    this.regform.navigate(["login"]);
  }
}