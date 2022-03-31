export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  constructor(readonly value: T) {}
  type = 'success' as const;
  timeStamp?: Date;
  isSuccess(): this is Success<T, E> {
    return true;
  }
  isFailure(): this is Failure<T, E> {
    return false;
  }

  getValue() {
    return this.value;
  }
}

export class Failure<T, E> {
  constructor(readonly value: E) {}
  type = 'failure' as const;
  timeStamp?: Date;
  isSuccess(): this is Success<T, E> {
    return false;
  }
  isFailure(): this is Failure<T, E> {
    return true;
  }
  getValue() {
    return this.value;
  }
}
