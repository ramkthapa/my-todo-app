import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DeleteComponent} from './delete.component';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


// mock object with close method
const dialogMock = {
  close: () => { }
};

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComponent ],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
      ],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog box', () => {
    spyOn(component.dialogRef, 'close');
    component.cancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
