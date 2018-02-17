import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  tasks = [];
  task = [];

  constructor(private _httpService: HttpService){}
  ngOnInit(){
    this.getTasksFromService()
    this.getTaskFromService()
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.tasks = data['tasks'];
      console.log("Got our tasks!", this.tasks)
    })
  }
  getTaskFromService(){
    let observable = this._httpService.getTask()
    observable.subscribe(data => {
      console.log("Got our task!", data)
      this.task = data['task'];
      console.log("Got our task!", this.task)
    })
  }
}
