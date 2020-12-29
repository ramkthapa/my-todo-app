import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListComponent} from './list.component';
import {of} from 'rxjs';
import {TodoListService} from '../../service/todoList.service';
import {AppRoutingModule} from '../../router/app-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CreateUpdateComponent} from '../create-update/create-update.component';
import {DeleteComponent} from '../delete/delete.component';
import {Router} from '@angular/router';
import {TodoListMock} from '../../service/todoList.mock';

const mockDialogRef = {
  open: () => {},
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('ListComponent', () => {
  let component: ListComponent;
  let dialogRef: MatDialog;
  let fixture: ComponentFixture<ListComponent>;
  let dialogSpy: jasmine.Spy;
  let todoService: TodoListService;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: TodoListService, useValue: TodoListMock.getFakeTodoListMockService()},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: Router, useValue: mockRouter},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoListService);
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    dialogRef = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog box to create new list', () => {
    const event = new Event('click');
    event.preventDefault();
    component.openCreateDialog(event);
    spyOn(todoService, 'getter').and.callThrough();
    dialogRef.open(DeleteComponent, {});
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(DeleteComponent, {});
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open edit list dialog box', () => {
    component.openEditDialog({
      title: 'test',
      description: 'test-description',
      dueDate: '2020-12-30T23:00:00.000Z',
    });
    spyOn(todoService, 'getter').and.callThrough();
    dialogRef.open(CreateUpdateComponent, {});
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(CreateUpdateComponent, {});
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should open delete confirmation dialog box', () => {
    component.openDeleteDialog({
      title: 'test',
      description: 'test-description',
      dueDate: '2020-12-30T23:00:00.000Z',
    });
    spyOn(todoService, 'deleteList').and.callThrough();
    dialogRef.open(CreateUpdateComponent, {});
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogSpy).toHaveBeenCalledWith(CreateUpdateComponent, {});
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should filter the todo lists', () => {
    const someValue = '';
    component.listFilter(someValue);
    component.lists = new MatTableDataSource<
      {
        title: 'test-one',
        description: 'test-description',
        dueDate: '2020-12-30T23:00:00.000Z',
      }>();
    expect(component.lists.filter).toEqual('');
  });
});
