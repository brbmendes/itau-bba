import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkRequestsComponent } from './talk-requests.component';

describe('TalkRequestsComponent', () => {
  let component: TalkRequestsComponent;
  let fixture: ComponentFixture<TalkRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalkRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
