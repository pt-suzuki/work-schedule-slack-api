import { RespondFn, SlackCommandMiddlewareArgs } from '@slack/bolt';
import { WorkScheduleService } from '~/domains/work_schedule/work_schedule_service';
import { WorkScheduleTranslator } from '~/domains/work_schedule/work_schedule_translator';
import { ScheduleCommandResponder } from './work_schedule_command_responder';

export class ScheduleCommandAction {
  private responder: ScheduleCommandResponder;
  private service: WorkScheduleService;
  private translator: WorkScheduleTranslator;

  constructor(
    responder: ScheduleCommandResponder,
    service: WorkScheduleService,
    translator: WorkScheduleTranslator
  ) {
    this.responder = responder;
    this.service = service;
    this.translator = translator;
  }

  invoke(command: SlackCommandMiddlewareArgs['payload'], say: RespondFn): void {
    this.responder.invoke(
      this.service.getTodayScheduleMessage(
        this.translator.translateCommandToCriteria(command)
      ),
      say
    );
  }
}
