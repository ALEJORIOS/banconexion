import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FallasPage } from './fallas.page';

describe('FallasPage', () => {
  let component: FallasPage;
  let fixture: ComponentFixture<FallasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FallasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
