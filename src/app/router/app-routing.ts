import { Routes } from '@angular/router';
import {ListComponent} from '../components/list/list.component';
import {CreateUpdateComponent} from '../components/create-update/create-update.component';
import {DeleteComponent} from '../components/delete/delete.component';

export const APP_ROUTES: Routes = [
  {path: '', component: ListComponent},
  {path: 'createUpdate', component: CreateUpdateComponent},
  {path: 'deleteDialog', component: DeleteComponent},
];
