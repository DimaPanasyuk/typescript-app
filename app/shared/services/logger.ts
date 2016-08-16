import { IError } from '../interfaces/error';

export class LoggerService {
  public static $inject = [];
  constructor() {}

  public log(error: IError): void {
    if (error.level) {
      this[error.level](error.message);
    };
  };

  public error(message: string): void {
    console.error(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }

  public info(message: string): void {
    console.info(message);
  }
}
