import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUpdateComponent } from './stores-update.compoment';


describe('UpdateProductComponent', () => {
  let component: StoreUpdateComponent;
  let fixture: ComponentFixture<StoreUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
