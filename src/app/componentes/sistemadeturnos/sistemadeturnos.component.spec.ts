import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemadeturnosComponent } from './sistemadeturnos.component';

describe('SistemadeturnosComponent', () => {
  let component: SistemadeturnosComponent;
  let fixture: ComponentFixture<SistemadeturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SistemadeturnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SistemadeturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
