import { HttpClient } from '../http_client';
import { ResponseHandlerImpl } from '../response_handler';
import {
  WorkScheduleRepository,
  WorkScheduleRepositoryImpl,
} from './work_schedule_repository';
import { WorkScheduleTranslatorImpl } from './work_schedule_translator';

let repository: WorkScheduleRepository;

beforeAll(() => {
  const handler = new ResponseHandlerImpl();
  const translator = new WorkScheduleTranslatorImpl(handler);
  const axios = new HttpClient(process.env.WORK_SCHEDULE_GAS_API_ROOT_URL!);
  repository = new WorkScheduleRepositoryImpl(translator, axios);
});

describe('Schedule Controller', () => {
  describe('検索', () => {
    it('検索成功', async () => {
      const result = await repository.search();
      expect(result.isSuccess()).toEqual(true);
    });
  });
});
