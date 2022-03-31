import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import {
  convertToCamelCase,
  convertToSnakeCase,
} from '~/helper/string_converter';

export class HttpClient {
  private axiosClient: AxiosInstance;

  constructor(clientUrl: string) {
    this.axiosClient = axios.create({
      baseURL: clientUrl,
      paramsSerializer(params) {
        return qs.stringify(convertToSnakeCase(params));
      },
      validateStatus(status) {
        return status < 500;
      },
    });
    this.axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
      config.data = convertToSnakeCase(config.data);
      return config;
    });
    this.axiosClient.interceptors.response.use((response) => {
      response.data = convertToCamelCase(response.data);
      return response;
    });
  }

  public getClient(): AxiosInstance {
    return this.axiosClient;
  }

  public get(url: string, params: any): Promise<AxiosResponse> {
    return this.axiosClient.get(url, { params: params });
  }
  public post(url: string, params: any): Promise<AxiosResponse> {
    return this.axiosClient.post(url, params);
  }
  public put(url: string, params: any): Promise<AxiosResponse> {
    return this.axiosClient.put(url, params);
  }
  public delete(url: string, params: any): Promise<AxiosResponse> {
    return this.axiosClient.delete(url, { data: params });
  }
}
