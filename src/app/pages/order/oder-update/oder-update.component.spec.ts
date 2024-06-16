import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OderUpdateComponent } from './oder-update.component';

describe('OderUpdateComponent', () => {
  let component: OderUpdateComponent;
  let fixture: ComponentFixture<OderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
