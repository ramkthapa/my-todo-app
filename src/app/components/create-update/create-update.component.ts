import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TodoListService} from '../../service/todoList.service';
import {MatDialogRef} from '@angular/material/dialog';

import {ListToDo} from '../../models/interface-todo';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit {
  list: ListToDo;
  minDate = new Date();
  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(
    private listService: TodoListService,
    protected dialogRef: MatDialogRef<CreateUpdateComponent>,
  ) { }

  ngOnInit(): void {
    this.list = this.listService.getter();
  }

  /** show error message below input fields */
  getErrorMessage(): any {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  /** create new list if no list id exist, edit list if available old list */
  createTodoList(): void {
    if (!this.list._id) {
      this.listService.createList(this.list).subscribe( response => {
        this.dialogRef.close();
      }, error => {
          console.log('create list error:', error);
      });
    } else {
      this.listService.updateList(this.list).subscribe( response => {
        this.dialogRef.close();
      }, error => {
        console.log('edit list error:', error);
      });
    }
  }

  /** cancel dialog box for create/update list */
  cancel(): void {
    this.dialogRef.close();
    window.location.reload();
  }
}
