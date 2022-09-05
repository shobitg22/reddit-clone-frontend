import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubredditsComponent } from './show-subreddits.component';

describe('ShowSubredditsComponent', () => {
  let component: ShowSubredditsComponent;
  let fixture: ComponentFixture<ShowSubredditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubredditsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSubredditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
