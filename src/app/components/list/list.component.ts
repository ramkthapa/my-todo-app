import {Component, OnInit} from '@angular/core';
import {TodoListService} from '../../service/todoList.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CreateUpdateComponent} from '../create-update/create-update.component';
import {DeleteComponent} from '../delete/delete.component';
import {MatTableDataSource} from '@angular/material/table';
import {ListToDo} from '../../models/interface-todo';
import {List} from '../../list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /** header title of table */
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'actions'];
  lists = new MatTableDataSource<ListToDo>();

  constructor(
    public listService: TodoListService,
    private router: Router,
    private dialogService: MatDialog) {}

  ngOnInit(): void {
    /** current changes of list value in refreshList$  */
    this.listService.refreshList$.subscribe(() => {
      this.getAllLists();
    });
    this.getAllLists();
  }

  /** get all the available To do lists */
  private getAllLists(): void {
    this.listService.getLists().subscribe(res => {
      this.lists.data = res.lists as ListToDo[];
    }, err => {
        console.log('get list error:', err);
    });
  }

  /** open create to do list dialog */
  openCreateDialog(event: any): void {
    event.preventDefault();
    const dialogRef = this.dialogService.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.router.navigate(['/createUpdate']);
      }
    });
    this.listService.setter(new List());
  }

  /** method to edit saved list */
  openEditDialog(list: ListToDo): void {
    const dialogRef = this.dialogService.open(CreateUpdateComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/createUpdate']);
      }
    });
    this.listService.setter(list);
  }

  /** Open delete confirmation dialog box */
  openDeleteDialog(list: ListToDo): void {
    const dialogRef = this.dialogService.open(DeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
          this.listService.deleteList(list._id).subscribe();
      }
    });
  }

  /** method to filter with title & description */
  listFilter(value: string): void {
    this.lists.filter = value.trim().toLocaleLowerCase();
  }
}
