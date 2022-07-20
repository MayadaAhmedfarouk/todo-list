import { Component, OnInit } from '@angular/core';
import { TodoApiService } from 'src/app/service/todo-api.service';
import { TaskTodoList } from './task-todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
   taskObj: TaskTodoList = new TaskTodoList();
  taskArr: TaskTodoList[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private todpService: TodoApiService) { }

  ngOnInit(): void {
    this.taskObj = new TaskTodoList();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.todpService.getAllData().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (err) => {
        alert('unable to get list of tasks');
      }
    );
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.todpService.addData(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      (err) => {
        alert(err);
      }
    );
  }
  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.todpService.editData(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.editTaskValue = '';
      },
      (err) => {
        alert('failed to update task');
      }
    );
  }
  deleteTask(etask:TaskTodoList){
    this.todpService.deleteData(etask).subscribe(res=>{
      this.ngOnInit();

    },err=>{
      alert("failed to delete task")
    }
    )
  }
  call(etask:TaskTodoList){
    this.taskObj=etask;
    this.editTaskValue=etask.task_name;
  }

}
