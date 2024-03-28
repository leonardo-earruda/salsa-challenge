import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar.service';
import { AllComponent } from './all.component';

describe('AllComponent', () => {
  let snackbarService: SnackbarService;
  let component: AllComponent;
  let fixture: ComponentFixture<AllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllComponent, HttpClientModule],
      providers: [SnackbarService],
    }).compileComponents();

    fixture = TestBed.createComponent(AllComponent);
    component = fixture.componentInstance;
    snackbarService = TestBed.inject(SnackbarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
