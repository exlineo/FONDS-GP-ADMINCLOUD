import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefixsComponent } from './prefixs.component';

describe('PrefixsComponent', () => {
  let component: PrefixsComponent;
  let fixture: ComponentFixture<PrefixsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrefixsComponent]
    });
    fixture = TestBed.createComponent(PrefixsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
