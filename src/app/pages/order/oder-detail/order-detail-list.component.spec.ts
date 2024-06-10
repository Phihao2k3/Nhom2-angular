import { ComponentFixture, TestBed } from '@angular/core/testing';

import { orderdetaillistComponent } from './order-detail-list.component';

describe('OderlistComponent', () => {
  let component: orderdetaillistComponent;
  let fixture: ComponentFixture<orderdetaillistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [orderdetaillistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(orderdetaillistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
