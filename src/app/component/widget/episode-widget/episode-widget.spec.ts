import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeWidget } from './episode-widget';

describe('EpisodeWidget', () => {
  let component: EpisodeWidget;
  let fixture: ComponentFixture<EpisodeWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
