import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWidget } from './character-widget';

describe('CharacterWidget', () => {
  let component: CharacterWidget;
  let fixture: ComponentFixture<CharacterWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
