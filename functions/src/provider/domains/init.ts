import { environments } from '~/config/environments';
import { HttpClient } from '~/domains/http_client';
import { ResponseHandlerImpl } from '~/domains/response_handler';

export const responseHandler = new ResponseHandlerImpl();

export const axios = new HttpClient(environments.axios.rootUrl);
