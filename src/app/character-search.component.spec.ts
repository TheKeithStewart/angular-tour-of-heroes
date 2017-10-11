import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CharacterSearchComponent } from './character-search.component';
import { CharacterSearchService } from './character-search.service';

class MockCharacterSearchService { }

describe('CharacterSearchComponent', () => {
  let component: CharacterSearchComponent;
  let fixture: ComponentFixture<CharacterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSearchComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .overrideComponent(CharacterSearchComponent, {
        set: {
          providers: [
            { provide: CharacterSearchService, useClass: MockCharacterSearchService }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
