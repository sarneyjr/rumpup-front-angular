import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderUnitComponent } from './order-unit.component';

describe('OrderUnitComponent', () => {
  let component: OrderUnitComponent;
  let fixture: ComponentFixture<OrderUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderUnitComponent]
    });
    fixture = TestBed.createComponent(OrderUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});