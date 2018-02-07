import { AnonymousSubject, Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { expect } from 'chai';

describe('sandbox test', () => {
  let root$: Subject<null>;

  beforeEach(() => {
    root$ = new Subject();
  });

  afterEach(() => {
    if (root$ && !root$.closed) {
      root$.complete();
    }
  });

  it('should count observers on ordinary subscribe handling', () => {
    expect(root$.observers.length).to.equal(0);

    const subscription = root$.subscribe();
    expect(root$.observers.length).to.equal(1);

    subscription.unsubscribe();
    expect(root$.observers.length).to.equal(0);
  });

  it('test 2', () => {
    const child$ = root$.asObservable();
    expect(root$.observers.length).to.equal(0);

    const subscription = child$.subscribe();
    expect(root$.observers.length).to.equal(1);

    subscription.unsubscribe();
    expect(root$.observers.length).to.equal(0);
  });

  it('test 3', () => {
    const lifted$ = <AnonymousSubject<null>>root$.pipe(tap(() => {}));
    expect(lifted$).not.to.equal(root$);
    expect(root$.observers.length).to.equal(0);
    expect(lifted$.observers.length).to.equal(0);

    const subscription = lifted$.subscribe();
    expect(lifted$.observers.length).to.equal(0);
    expect(root$.observers.length).to.equal(1);

    subscription.unsubscribe();
    expect(lifted$.observers.length).to.equal(0);
    expect(root$.observers.length).to.equal(0);
  });

  it('test 4', () => {
    const lifted$ = <AnonymousSubject<null>>root$.pipe(tap(() => {}));
    expect(lifted$).not.to.equal(root$);
    expect(root$.observers.length).to.equal(0);
    expect(lifted$.observers.length).to.equal(0);

    const subscription = lifted$.subscribe();
    expect(lifted$.observers.length).to.equal(0);
    expect(root$.observers.length).to.equal(1);

    subscription.unsubscribe();
    expect(lifted$.observers.length).to.equal(0);
    expect(root$.observers.length).to.equal(0);
  });
});
