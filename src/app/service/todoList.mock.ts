import {Observable, of, Subject} from 'rxjs';
import {ListToDo} from '../models/interface-todo';


const mockCreateListResponse = {
  list:
    {
      _id: '5fe8fd03c5bb782caca1590b',
      title: 'aaaa',
      description: 'bbbbb',
      dueDate: '2020-12-28T23:00:00.000Z',
    }
};

const mockGetAllLists = [
  {
    _id: '5fe8fd03c5bb782caca1dd0b',
    title: 'aaaa1',
    description: 'bbbbb1',
    dueDate: '2020-12-28T23:00:00.000Z',
  },
  {
    _id: '5fe8fd03c5bb782caca1590b',
    title: 'aaaa',
    description: 'bbbbb',
    dueDate: '2020-12-28T23:00:00.000Z',
  },
];

const mockUpdateList = {
  list:
    {
      _id: '5fe66b31c5bb782caca15903',
      title: 'tester 111',
      description: 'a good tester',
      dueDate: '2020-12-30T23:00:00.000Z',
  }
};

const mockDeleteList = {
  list:
    {
      _id: '5feb0446992780342895f152',
      title: 'aaaaaa',
      description: 'abbbb',
      dueDate: '2020-12-29T23:00:00.000Z',
  }
};

export class TodoListMock {
  static getFakeTodoListMockService(): any {
    return {
      getLists(): Observable<any> {
        return of(mockGetAllLists);
      },

      createList(list: ListToDo): Observable<any> {
        return of(mockCreateListResponse.list);
      },

      updateList(list: ListToDo): Observable<any> {
        return of(mockUpdateList.list);
      },

      deleteList(id: string): Observable<any> {
        return of(mockDeleteList);
      },

      refreshList: new Subject<void>(),

      setter: () => {
        return of({});
      },

      getter: () => {
        return of ({});
      },
  };
}
}
