import { WorkScheduleRepositoryImpl } from '~/domains/work_schedule/work_schedule_repository';
import { WorkScheduleTranslatorImpl } from '~/domains/work_schedule/work_schedule_translator';
import { WorkScheduleServiceImpl } from '~/domains/work_schedule/work_schedule_service';
import { axios, responseHandler } from './init';

const workScheduleTranslator = new WorkScheduleTranslatorImpl(responseHandler);
const workScheduleRepository = new WorkScheduleRepositoryImpl(
  workScheduleTranslator,
  axios
);

const workScheduleService = new WorkScheduleServiceImpl(
  workScheduleTranslator,
  workScheduleRepository
);

export { workScheduleService, workScheduleTranslator };
