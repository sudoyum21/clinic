import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private httpService : HttpService) { }

  ngOnInit() {
    this.getForm();
  }
  getForm(){
    this.httpService.getFoods().subscribe(data=>{
      console.log(data)
    })
  }
}
