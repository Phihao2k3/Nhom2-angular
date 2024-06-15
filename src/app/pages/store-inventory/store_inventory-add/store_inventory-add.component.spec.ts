import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInventoryAddComponent } from './store_inventory-add.component';

describe('StoreInventoryAddComponent', () => {
  let component: StoreInventoryAddComponent;
  let fixture: ComponentFixture<StoreInventoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInventoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInventoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
