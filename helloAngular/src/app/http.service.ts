import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    console.log("Hello??")
      //this.getTasks();
      //this.getTask();
  }
  getTasks(){
    //console.log('hi');
    // our http response is an Observabele, store in in a variable
    //let tempObservable = this._http.get('/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    //tempObservable.subscribe(data => console.log("Got our tasks!", data));
    return this._http.get('/tasks');
  }
  getTask(task_id){
    console.log('ID is', task_id);
    // let tempObservable = this._http.get('/tasks/5a84f4c3d7dee2b8012d96ae');
    // tempObservable.subscribe(data => console.log("Got the task!", data));
    return this._http.get('/tasks/'+task_id);
  }
  addTask(newtask){
    return this._http.post('/tasks', newtask)
  }


}
