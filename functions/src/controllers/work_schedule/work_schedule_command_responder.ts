import { SayFn } from '@slack/bolt';
export interface ScheduleCommandResponder {
  invoke(result: Promise<string | null>, say: SayFn): void;
}

export class ScheduleCommandResponderImpl implements ScheduleCommandResponder {
  invoke(result: Promise<string | null>, say: SayFn) {
    result
      .then((data) => {
        if (!data) {
          say('スケジュールの取得に失敗！');
          return;
        }
        say(data);
      })
      .catch((e) => {
        say(e);
      });
  }
}
