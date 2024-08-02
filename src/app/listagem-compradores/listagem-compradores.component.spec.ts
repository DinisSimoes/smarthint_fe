import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCompradoresComponent } from './listagem-compradores.component';

describe('ListagemCompradoresComponent', () => {
  let component: ListagemCompradoresComponent;
  let fixture: ComponentFixture<ListagemCompradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemCompradoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemCompradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
