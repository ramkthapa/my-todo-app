import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { CreateUpdateComponent } from './create-update.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TodoListService} from '../../service/todoList.service';
import {mockToDoListService} from '../list/list.component.spec';
import {MatDialogRef} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of, throwError} from 'rxjs';
import {WINDOW_TOKEN} from '../../app.module';

const mockDialogRef = {
  open: () => {},
  close: () => {},
};

const mockWindow = {
  location: { reload: () => {} },
};

describe('CreateUpdateComponent', () => {
  let component: CreateUpdateComponent;
  let service: TodoListService;
  let dialogRef: MatDialogRef<CreateUpdateComponent>;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };
  let fixture: ComponentFixture<CreateUpdateComponent>;

  const mockEmptyList = {
    _id: null,
    title: null,
    description: null,
    dueDate: null,
  };

  const mockList = {
    _id: 'I-can-be-funny-in-id',
    title: null,
    description: null,
    dueDate: 'some-date',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: TodoListService, useValue: mockToDoListService},
        {provide: WINDOW_TOKEN, useValue: mockWindow},
        {provide: MatDialogRef, useValue: mockDialogRef},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateComponent);
    service = TestBed.inject(TodoListService);
    dialogRef = TestBed.inject(MatDialogRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create to do list', () => {
    component.list = mockEmptyList;
    const spyCreateList = spyOn(service, 'createList').and.callThrough();
    component.createTodoList();
    expect(spyCreateList).toHaveBeenCalled();
  });

  it('should edit to do list', () => {
    component.list = mockList;
    const spyCreateList = spyOn(service, 'updateList').and.callThrough();
    component.createTodoList();
    expect(spyCreateList).toHaveBeenCalled();
  });

  it('should return error if create list failed', () => {
    component.list = mockEmptyList;
    const mockCall = spyOn(service, 'createList').and.returnValue(throwError({status: 404}));
    component.createTodoList();
    expect(mockCall).toHaveBeenCalled();
  });

  it('should return error if update list failed', () => {
    component.list = mockList;
    const mockCall = spyOn(service, 'updateList').and.returnValue(throwError({status: 404}));
    component.createTodoList();
    fixture.detectChanges();
    expect(mockCall).toHaveBeenCalled();
  });

  it('should return error message in frontend', fakeAsync (() => {
    component.formControl = new FormControl('', [Validators.required]);
    const spyError = spyOn(component.formControl, 'hasError').and.returnValue(true);
    const inputField = fixture.debugElement.nativeElement.querySelector('input');
    inputField.click();
    tick();
    component.getErrorMessage();
    expect(spyError).toHaveBeenCalledWith('required');
  }));

  xit('should cancel dialog box', fakeAsync( () => {
    spyOn(dialogRef, 'close');
    spyOn(window.location, 'reload').and.callFake(() => {});
    component.cancel();
    expect(window.location.reload).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();

  }));
});
