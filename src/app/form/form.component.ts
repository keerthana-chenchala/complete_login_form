import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';
import * as _ from 'underscore';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myDate=moment().format('YYYY-MM-DD')
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy.mm.dd',
};
  title = 'Registration Form';
  data:any={}
  array:any=[];
  disabled=false;
  ShowFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  dropdownSettings:any={};
  selectedState:any;
angForm;
  constructor(private http: HttpClient,private form: FormBuilder,private logform:Router) {
   
  }
  

  ngOnInit(){
    this.angForm = this.form.group({
       name: ['', [Validators.required,Validators.minLength(4)] ],
       dob: [null, [Validators.required] ],
       email: ['', [Validators.required,Validators.email]],
       num: ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
       password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
       abtu: ['',[Validators.required]],
       states: [this.selectedState],
       //states:['', [Validators.required]],
       gender: ['', [Validators.required]],
       accept: ['', [Validators.requiredTrue]]
    });
    this.states=[{item_id:1,item_text:'Kerala'},
    {item_id:2,item_text:'Andhra Pradesh'},
    {item_id:3,item_text:'Telangana'},
    {item_id:4,item_text:'Tamil Nadu'},
    {item_id:5,item_text:'Karnataka'},
    {item_id:6,item_text:'Goa'},
    {item_id:7,item_text:'Jammu and Kashmir'},
    {item_id:8,item_text:'Orissa'}];

    // this.selectedItems=[]
    
    console.log(this.selectedItems);
    this.dropdownSettings={
      singleSelection:false,
      idField:'item_id',
      textField:'item_text',
      selectAllText:'SelectAll',
      unSelectAllText:'UnSelectAll',
      itemsShowLimit:2,
      allowSearchFiter:this.ShowFilter
    };
  }
  onItemSelect(item:any){
    console.log(item.item_text)
    this.selectedItems.push(item.item_text);

    this.selectedState=this.selectedItems.toString();
   // this.selectedItems= _.pluck(item,'item_text');
      console.log(this.selectedItems);
      console.log(this.selectedState);
  }
  onSelectAll(item:any){
    console.log('onSelectAll',item)
  }


//   onDateChanged(event: IMyDateModel) {
//     // event properties are: event.date, event.jsdate, event.formatted and event.epoc
// }



    // @Output() edata =new EventEmitter();
    onSubmit(data) {
      console.log(this.angForm.value)
      // this.array.push((this.angForm.value))
      // this.array=this.angForm.value;
      data['dob']=moment(data.dob.formatted).format('YYYY-MM-DD');
      data['states']=this.selectedState;
      this.http.post('http://localhost:7000/add',data)
      .subscribe((res: Request) => {
        this.array=res;
        this.logform.navigate(["success"]);
      }, error => {
        console.log(error);
      });
      console.log(data)

      // this.selectedItems= _.pluck(this.states,'item_text');
      // console.log(this.selectedItems);
     this.angForm.reset()
    }
 
    }
  

