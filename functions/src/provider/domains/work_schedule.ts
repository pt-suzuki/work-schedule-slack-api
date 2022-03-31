import { WorkScheduleRepositoryImpl } from '~/domains/work_schedule/work_schedule_repository';
import { WorkScheduleTranslatorImpl } from '~/domains/work_schedule/work_schedule_translator';
import { WorkScheduleServiceImpl } from '~/domains/work_schedule/work_schedule_service';
import { axios, responseHandler } from './init';

const scheduleTranslator = new WorkScheduleTranslatorImpl(responseHandler);
const scheduleRepository = new WorkScheduleRepositoryImpl(
  scheduleTranslator,
  axios
);

const scheduleService = new WorkScheduleServiceImpl(
  scheduleTranslator,
  scheduleRepository
);

export { scheduleService, scheduleTranslator };
