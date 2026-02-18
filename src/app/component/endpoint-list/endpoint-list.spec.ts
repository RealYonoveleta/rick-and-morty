import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointList } from './endpoint-list';

describe('EndpointList', () => {
  let component: EndpointList;
  let fixture: ComponentFixture<EndpointList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndpointList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
