import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDetail } from './json-detail';

describe('JsonDetail', () => {
  let component: JsonDetail;
  let fixture: ComponentFixture<JsonDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
