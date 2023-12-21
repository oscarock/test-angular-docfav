import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFiltersComponent } from './form-filters.component';

describe('FormFiltersComponent', () => {
  let component: FormFiltersComponent;
  let fixture: ComponentFixture<FormFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
