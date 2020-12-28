import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ListToDo} from '../models/interface-todo';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  /** url and port that runs backend application */
  private baseUri = 'http://localhost:3000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private list: ListToDo;


  /** prepare refresh list observable */
  public refreshList = new Subject<void>();

  /** Constructor */
  constructor(private http: HttpClient) {}

  /** get current lists */
  get refreshList$(): Observable<any> {
    return this.refreshList;
  }

  /** Get all the available lists */
  getLists(): Observable<any> {
    return this.http.get<ListToDo[]>(this.baseUri + '/read', { headers: this.headers });
  }

  /** Post request to backend to create new list */
  createList(list: ListToDo): Observable<any> {
    return this.http.post(this.baseUri + '/create', list, { headers: this.headers }).
      pipe(
        tap(() => {
          this.refreshList.next();
        })
    );
  }

  /** method for update list */
  updateList(list: ListToDo): Observable<any> {
    return this.http.put(this.baseUri + '/update', list, { headers: this.headers }).
    pipe(
      tap(() => {
        this.refreshList.next();
      })
    );
  }

  /** method for delete list */
  deleteList(id: string): Observable<any> {
    return this.http.delete(this.baseUri + '/delete/' + id , { headers: this.headers }).
    pipe(
      tap(() => {
        this.refreshList.next();
      })
    );
  }

  /** set data in List object */
  setter(list: ListToDo): void {
    this.list = list;
  }

  /** get data from List object */
  getter(): ListToDo {
    return this.list;
  }
}
