import { App, ExpressReceiver } from '@slack/bolt';
import { environments } from './config/environments';
import router from './routes';

export class ExpressServer {
  private app: App;
  private expressReceiver: ExpressReceiver;

  constructor() {
    this.initApp();
    router(this.app);
  }

  public getInstance() {
    return this.app;
  }

  public getReceiver() {
    return this.expressReceiver;
  }

  private initApp() {
    this.expressReceiver = new ExpressReceiver({
      signingSecret: environments.slack.signingSecret,
      endpoints: '/events',
      processBeforeResponse: true,
    });
    this.app = new App({
      receiver: this.expressReceiver,
      token: environments.slack.botToken,
      processBeforeResponse: true,
    });
  }
}
