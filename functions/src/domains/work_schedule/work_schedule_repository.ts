import { HttpClient } from '../http_client';
import { ResponseError } from '../response_error';
import { Result } from '../result';
import { WorkSchedule } from './work_schedule';
import { WorkScheduleTranslator } from './work_schedule_translator';

export interface WorkScheduleRepository {
  search(): Promise<Result<WorkSchedule[], ResponseError>>;
}

export class WorkScheduleRepositoryImpl implements WorkScheduleRepository {
  private translator: WorkScheduleTranslator;
  private axios: HttpClient;

  constructor(translator: WorkScheduleTranslator, axios: HttpClient) {
    this.translator = translator;
    this.axios = axios;
  }

  async search(): Promise<Result<WorkSchedule[], ResponseError>> {
    const response = await this.axios.get('/exec', {});
    return this.translator.translateAxiosResponseToResult(response);
  }
}
