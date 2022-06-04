import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptsComponent } from './recipts.component';

describe('ReciptsComponent', () => {
  let component: ReciptsComponent;
  let fixture: ComponentFixture<ReciptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
