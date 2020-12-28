import { TestBed } from '@angular/core/testing';
import {TodoListService} from './todoList.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ListToDo} from '../models/interface-todo';
import {Subject} from 'rxjs';


describe('TodoListService', () => {
  let service: TodoListService;
  let http: HttpTestingController;

  const mockTodoLists: ListToDo[] = [
    {
      title: 'watch tv',
      description: 'abc-description',
      dueDate: '2020-12-25T23:00:00.000Z',
    },
    {
      title: 'I am funny',
      description: 'I am being too funny in test',
      dueDate: '2020-12-27T23:00:00.000Z',
    },
  ];

  const mockToDoList: ListToDo = {
    title: 'watch tv',
    description: 'abc-description',
    dueDate: '2020-12-25T23:00:00.000Z',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoListService],
    });
  });
  beforeEach(() => {
    service = TestBed.inject(TodoListService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the available todo lists', () => {
    service.getLists().subscribe( res => {
      expect(res).toEqual(mockTodoLists);
    });
    const req = http.expectOne(`http://localhost:3000/read`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodoLists);
  });

  it('should create new list', () => {
    service.createList(mockToDoList).subscribe( res => {
      expect(res).toEqual(mockToDoList);
    });
    const req = http.expectOne(`http://localhost:3000/create`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockToDoList);
  });

  it('should update the selected list', () => {
    service.updateList(mockToDoList).subscribe( res => {
      expect(res).toEqual(mockToDoList);
    });
    const req = http.expectOne(`http://localhost:3000/update`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockToDoList);
  });

  it('should delete the list', () => {
    service.deleteList('some-id').subscribe( res => {
      expect(res).toEqual(mockToDoList);
    });
    const req = http.expectOne(`http://localhost:3000/delete/some-id`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockToDoList);
  });

  it('should test setter method', () => {
    service['list'] = mockToDoList;
    expect(service.setter(mockToDoList)).toBe(undefined);
  });

  it('should test getter method', () => {
    service['list'] = mockToDoList;
    expect(service.getter()).toEqual(mockToDoList);
  });

  it('should return current lists', () => {
    const mockSub = new Subject();
    expect(service.refreshList$).toEqual(mockSub);
  });
});
