import { App } from '@slack/bolt';
import { ScheduleCommandAction } from './controller/work_schedule/work_schedule_command_action';
import { ScheduleCommandResponderImpl } from './controller/work_schedule/work_schedule_command_responder';
import { scheduleService, scheduleTranslator } from './provider/domains';

const scheduleCommand = new ScheduleCommandAction(
  new ScheduleCommandResponderImpl(),
  scheduleService,
  scheduleTranslator
);

const router = (app: App) => {
  app.command('/echo', async ({ command, ack, respond }) => {
    ack();
    scheduleCommand.invoke(command, respond);
  });
};

export default router;
