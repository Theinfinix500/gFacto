import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFactureComponent } from './ajout-facture.component';

describe('AjoutFactureComponent', () => {
  let component: AjoutFactureComponent;
  let fixture: ComponentFixture<AjoutFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
