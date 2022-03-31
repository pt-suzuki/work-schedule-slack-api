import { AxiosResponse } from 'axios';
import { Result, Success, Failure } from './result';
import { ResponseError } from './response_error';
import { parseDate } from '~/helper/date_helper';
import { DEFAULT_ERROR_MESSAGE } from '~/constants/messages';

export interface ResponseHandler {
  translateResponseToModel<T>(response: any): Result<T, ResponseError>;
  translateResponseToDateList(
    response: AxiosResponse
  ): Result<Date[], ResponseError>;
}

export class ResponseHandlerImpl implements ResponseHandler {
  translateResponseToModel<T>(
    response: AxiosResponse
  ): Result<T, ResponseError> {
    if (response.status === 200) {
      return new Success<T, ResponseError>(response.data);
    }

    return this.createErrorResponse<Date[]>(response);
  }

  translateResponseToDateList(
    response: AxiosResponse<string[]>
  ): Result<Date[], ResponseError> {
    if (response.status === 200) {
      const result: Date[] = [];
      response.data.forEach((element: string) => {
        result.push(parseDate(element));
      });
      return new Success<Date[], ResponseError>(result);
    }
    return this.createErrorResponse<Date[]>(response);
  }

  private createErrorResponse<T>(
    response: AxiosResponse
  ): Failure<T, ResponseError> {
    let message = DEFAULT_ERROR_MESSAGE;
    if (response.data.message) {
      message = response.data.message;
    }
    return new Failure<T, ResponseError>(new ResponseError(message));
  }
}
