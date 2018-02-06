import { Subject } from 'rxjs/Subject';

describe('sandbox test', () => {
  let subject: Subject<null>;

  beforeEach(() => {
    subject = new Subject();
  });

  afterEach(() => {
    if (subject && !subject.closed) {
      subject.complete();
    }
  });

  it('should count observers on ordinary subscribe handling', () => {
    expect(subject.observers.length).toBe(0);

    const subscription = subject.subscribe();
    expect(subject.observers.length).toBe(1);

    subscription.unsubscribe();
    expect(subject.observers.length).toBe(0);
  });
});
