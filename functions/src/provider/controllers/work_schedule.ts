import { ScheduleCommandAction } from '~/controllers/work_schedule/work_schedule_command_action';
import { ScheduleCommandResponderImpl } from '~/controllers/work_schedule/work_schedule_command_responder';
import { workScheduleService, workScheduleTranslator } from '~/provider/domains';

const workScheduleCommand = new ScheduleCommandAction(
  new ScheduleCommandResponderImpl(),
  workScheduleService,
  workScheduleTranslator
);

export { workScheduleCommand };
