import * as functions from 'firebase-functions';

export interface Slack {
  botToken: string;
  signingSecret: string;
}

export interface Axios {
  rootUrl: string;
}

export interface Environments {
  slack: Slack;
  axios: Axios;
}

export const environments = functions.config().env as Environments;
