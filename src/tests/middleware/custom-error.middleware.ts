
import {ErrorMiddlewareInterface, MiddlewareGlobalAfter} from 'routing-controllers';


@MiddlewareGlobalAfter()
export class CustomErrorHandler implements ErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: (err: any) => any) {
    response.status(500).json({
      errorMessage: error.message
    });
  }
}
