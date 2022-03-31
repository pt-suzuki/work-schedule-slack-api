import * as functions from 'firebase-functions';
import './config/environments';
import { ExpressServer } from './server';

const server = new ExpressServer();

// NOTE: /apiとcsvダウンロードのためにメモリ上限を増加
const cpExtendRuntimeOption: functions.RuntimeOptions = {
  memory: '2GB',
  timeoutSeconds: 60,
};

export const slack = functions
  .runWith(cpExtendRuntimeOption)
  .region('asia-northeast1')
  .https.onRequest(server.getReceiver().app);
