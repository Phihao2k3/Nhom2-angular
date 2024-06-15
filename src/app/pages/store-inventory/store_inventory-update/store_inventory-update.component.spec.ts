import { ComponentFixture, TestBed } from '@angular/core/testing';

import {StoreInventoryUpdateComponent } from './store_inventory-update.component';

describe('StoreInventoryUpdateComponent', () => {
  let component: StoreInventoryUpdateComponent;
  let fixture: ComponentFixture<StoreInventoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInventoryUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInventoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
