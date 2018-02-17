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
  id = '';

  constructor(private _httpService: HttpService){}
  // ngOnInit(){
  //   this.getTasksFromService()
  //   this.getTaskFromService()
  // }
  tasksOnClick(){
    let observable = this._httpService.getTasks()
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.tasks = data['tasks'];
      console.log("Got our tasks!", this.tasks)
    })
  }
  taskOnClick(event: any){
    this.task = [];
    this.id = event.target.value;
    let observable = this._httpService.getTask(this.id)
    observable.subscribe(data => {
      console.log("Clicked the button!", this.id)
      this.task = data['task'];
      console.log("Got our task!", this.task)
    })
  }

}
