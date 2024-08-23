export class AppException extends Error {
  data: any;
  constructor(error?: string | Error, _data: any = {}) {
    if (error instanceof Error) {
      super(error.message);
      this.name = error.name;
      this.stack = error.stack;
    } else {
      super(error ?? 'An error occured.');
      this.data = _data;
    }
  }
}
