export class ServerResponse<T> {
    constructor(
      public message: string,
      public data?: T
    ) { }
  }
  