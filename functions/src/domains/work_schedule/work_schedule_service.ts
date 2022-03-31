import { DEFAULT_ERROR_MESSAGE } from '~/constants/messages';
import * as L from '~/helper/logger_helper';
import { ResponseError } from '../response_error';
import { Result } from '../result';
import { WorkSchedule } from './work_schedule';
import { WorkScheduleCriteria } from './work_schedule_criteria';
import { WorkScheduleRepository } from './work_schedule_repository';
import { WorkScheduleTranslator } from './work_schedule_translator';

export interface WorkScheduleService {
  getTodayScheduleMessage(criteria: WorkScheduleCriteria): Promise<string>;
  search(
    criteria: WorkScheduleCriteria
  ): Promise<Result<WorkSchedule[], ResponseError>>;
}

export class WorkScheduleServiceImpl implements WorkScheduleService {
  private translator: WorkScheduleTranslator;
  private repository: WorkScheduleRepository;

  constructor(
    translator: WorkScheduleTranslator,
    repository: WorkScheduleRepository
  ) {
    this.translator = translator;
    this.repository = repository;
  }

  async getTodayScheduleMessage(
    criteria: WorkScheduleCriteria
  ): Promise<string> {
    const serchResponse = await this.search(criteria);

    if (serchResponse.isFailure()) {
      return DEFAULT_ERROR_MESSAGE;
    }

    console.log(serchResponse);

    return this.translator.translateListToMessage(serchResponse.getValue());
  }

  async search(
    criteria: WorkScheduleCriteria
  ): Promise<Result<WorkSchedule[], ResponseError>> {
    L.info(criteria.text);
    return this.repository.search();
  }
}
