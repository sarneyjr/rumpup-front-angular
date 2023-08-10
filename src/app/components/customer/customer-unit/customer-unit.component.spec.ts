import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerUnitComponent } from './customer-unit.component';

describe('CustomerUnitComponent', () => {
  let component: CustomerUnitComponent;
  let fixture: ComponentFixture<CustomerUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerUnitComponent]
    });
    fixture = TestBed.createComponent(CustomerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});