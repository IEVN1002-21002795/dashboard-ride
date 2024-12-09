import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosComponent } from './procesos.component';

describe('ProcesosComponent', () => {
  let component: ProcesosComponent;
  let fixture: ComponentFixture<ProcesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
