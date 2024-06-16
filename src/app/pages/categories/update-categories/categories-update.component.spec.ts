import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdateComponent } from './categories-update.compoment';


describe('UpdateProductComponent', () => {
  let component: CategoriesUpdateComponent;
  let fixture: ComponentFixture<CategoriesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
