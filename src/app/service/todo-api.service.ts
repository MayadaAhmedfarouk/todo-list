import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { TaskTodoList } from '../component/todo-list/task-todo-list';



@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  URl="http://localhost:3000/tasks"
  constructor(private http:HttpClient) { }
  addData(task:TaskTodoList):Observable <TaskTodoList>{
    return this.http.post<TaskTodoList>(this.URl, task)

  }
  getAllData():Observable <TaskTodoList[]>{
    return this.http.get<TaskTodoList[]>(this.URl)

  }
  deleteData(task:TaskTodoList):Observable <TaskTodoList>{
    return this.http.delete<TaskTodoList>(this.URl+'/'+task.id)

  }
  editData(task:TaskTodoList):Observable <TaskTodoList>{
    return this.http.put<TaskTodoList>(this.URl +'/'+task.id, task)

  }
}
