import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductDetailsComponent } from './cart-product-details.component';

describe('CartProductDetailsComponent', () => {
  let component: CartProductDetailsComponent;
  let fixture: ComponentFixture<CartProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
