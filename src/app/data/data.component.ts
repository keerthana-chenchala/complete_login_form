import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AppService } from '../app.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
tabledata:any;
selected:any;
  constructor(private http: HttpClient,private regform:Router, public service :AppService) { }
  getlist(){
    this.http.get('http://localhost:7000')
      .subscribe((res: Request) => {
        this.tabledata=res;
       console.log(this.tabledata);
      }, error => {
        console.log(error);
      });
      
  }

  ngOnInit() {
    this.getlist()

  }
  add(){
    this.regform.navigate(["form"]);
  }
edit(data){
  console.log(data);
  this.service.data1=data;
  this.regform.navigate(["editform"]);
 
}
delete(id){
  //console.log(id);
  this.http.post('http://localhost:7000/delete',id).subscribe(data=>{
    this.getlist();
  }, error => {
    console.log(error);
  });
 
}
}
