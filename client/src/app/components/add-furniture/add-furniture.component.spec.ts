import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFurnitureComponent } from './add-furniture.component';

describe('AddFurnitureComponent', () => {
  let component: AddFurnitureComponent;
  let fixture: ComponentFixture<AddFurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFurnitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
