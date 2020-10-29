import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProfComponent } from './select-prof.component';

describe('SelectProfComponent', () => {
  let component: SelectProfComponent;
  let fixture: ComponentFixture<SelectProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
