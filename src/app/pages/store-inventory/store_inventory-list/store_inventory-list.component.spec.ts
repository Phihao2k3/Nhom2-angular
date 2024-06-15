import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInventoryListComponent } from './store_inventory-list.component';

describe('OderlistComponent', () => {
  let component: StoreInventoryListComponent;
  let fixture: ComponentFixture<StoreInventoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInventoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
