import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductDetailsComponent } from './order-product-details.component';

describe('OrderProductDetailsComponent', () => {
  let component: OrderProductDetailsComponent;
  let fixture: ComponentFixture<OrderProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
