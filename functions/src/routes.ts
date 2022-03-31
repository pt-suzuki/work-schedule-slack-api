import { App } from '@slack/bolt';
import { workScheduleCommand } from './provider/controllers';

const router = (app: App) => {
  app.command('/work_schedule', async ({ command, ack, respond }) => {
    ack();
    workScheduleCommand.invoke(command, respond);
  });
};

export default router;
