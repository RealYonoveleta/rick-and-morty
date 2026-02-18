import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNav } from './dropdown-nav';

describe('DropdownNav', () => {
  let component: DropdownNav;
  let fixture: ComponentFixture<DropdownNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
