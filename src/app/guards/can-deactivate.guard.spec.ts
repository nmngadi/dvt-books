import { CanDeactivateGuard } from "./can-deactivate.guard";
import { TestBed } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockComponent implements CanDeactivateGuard {
  returnValue: boolean | Observable<boolean>;

  canDeactivate(): boolean | Observable<boolean> {
    return this.returnValue;
  }
}
describe('CanDeactivateGuard', () => {
  let mockComponent: MockComponent;
  let service: CanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanDeactivateGuard,
        MockComponent,
        RouterTestingModule
      ]
    });
    service = TestBed.get(CanDeactivateGuard);
    mockComponent = TestBed.get(MockComponent);
  });

  it('expect service to instantiate', () => {
    expect(service).toBeTruthy();
  });

  it('can route if unguarded', () => {
    mockComponent.returnValue = true;
    expect(service.canDeactivate(mockComponent)).toBeTruthy();
  });

  it('will route if guarded and user accepted the dialog', () => {

    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$ = <Observable<boolean>>service.canDeactivate(mockComponent);

    canDeactivate$.subscribe((deactivate) => {
      expect(deactivate).toBeTruthy();
    });

    subject$.next(true);
    expect()
  });

  it('will not route if guarded and user rejected the dialog', () => {

    const subject$ = new Subject<boolean>();
    mockComponent.returnValue = subject$.asObservable();
    const canDeactivate$ = <Observable<boolean>>service.canDeactivate(mockComponent);

    canDeactivate$.subscribe((deactivate) => {
      expect(deactivate).toBeFalsy();
    });

    subject$.next(false);
  });
});
