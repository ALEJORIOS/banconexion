import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotLlowedPage } from './not-llowed.page';

describe('NotLlowedPage', () => {
  let component: NotLlowedPage;
  let fixture: ComponentFixture<NotLlowedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotLlowedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
