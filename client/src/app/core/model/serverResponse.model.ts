export class ServerResponse {
    constructor(
      public message: string,
      public data?: any,
      public success?: boolean
    ) { }
  }
  