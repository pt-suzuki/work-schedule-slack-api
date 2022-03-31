import { SlackCommandMiddlewareArgs } from '@slack/bolt';
import { AxiosResponse } from 'axios';
import { ResponseError } from '../response_error';
import { ResponseHandler } from '../response_handler';
import { Result } from '../result';
import { WorkSchedule } from './work_schedule';
import { WorkScheduleCriteria } from './work_schedule_criteria';

export interface WorkScheduleTranslator {
  translateCommandToCriteria(
    command: SlackCommandMiddlewareArgs['payload']
  ): WorkScheduleCriteria;
  translateAxiosResponseToResult(
    response: AxiosResponse
  ): Result<WorkSchedule[], ResponseError>;
  translateListToMessage(list: WorkSchedule[]): string;
}

export class WorkScheduleTranslatorImpl implements WorkScheduleTranslator {
  private responseHandler: ResponseHandler;

  constructor(responseHandler: ResponseHandler) {
    this.responseHandler = responseHandler;
  }

  translateCommandToCriteria(
    command: SlackCommandMiddlewareArgs['payload']
  ): WorkScheduleCriteria {
    return {
      text: command.text,
    };
  }

  translateAxiosResponseToResult(
    response: AxiosResponse
  ): Result<WorkSchedule[], ResponseError> {
    const result =
      this.responseHandler.translateResponseToModel<WorkSchedule[]>(response);

    if (result.isFailure()) return result;

    result.getValue().map((item) => {
      item.date = new Date(item.date);
    });

    return result;
  }

  translateListToMessage(list: WorkSchedule[]): string {
    let holyday = '';
    let work = '';
    let outing = '';

    list.forEach((item) => {
      if (item.type.indexOf('リモート') > -1) return;

      if (item.type.indexOf('外出') > -1) {
        outing += `    •   ${item.name}(@${item.slackName})\r\n`;
        return;
      }
      if (item.type.indexOf('出勤') > -1) {
        work += `    •   ${item.name}(@${item.slackName})\r\n`;
        return;
      }
      if (item.isHoliday) {
        holyday += `    •   ${item.name}(@${item.slackName})\r\n`;
        return;
      }
    });

    return `
      ■本日の出勤予定
      •   休暇
      ${holyday === '' ? 'いません' : holyday}
      •   出勤
      ${work === '' ? 'いません' : work}
      •   外出
      ${outing === '' ? 'いません' : outing}
    `;
  }
}
