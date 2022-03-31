import * as changeCase from 'change-case';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertToSnakeCase = (value: any): any => {
  if (value instanceof Array) {
    return value.map((v) => convertToSnakeCase(v));
  }
  if (value instanceof Object && !value) {
    return Object.keys(value).reduce((result: any, key) => {
      const newKey: string = changeCase.snakeCase(key);
      result[newKey] = convertToSnakeCase(value[key]);
      return result;
    }, {});
  }
  return value;
};

export const convertToCamelCase = (value: any): any => {
  if (value instanceof Array) {
    return value.map((v) => convertToCamelCase(v));
  }
  if (value instanceof Object && !value) {
    return Object.keys(value).reduce((result: any, key) => {
      const newKey: string = changeCase.camelCase(key);
      result[newKey] = convertToCamelCase(value[key]);
      return result;
    }, {});
  }
  return value;
};

const formatter = new Intl.NumberFormat('ja-JP');

export const convertYen = (value: number): string => {
  return `${formatter.format(value)}`;
};

/* eslint-enable @typescript-eslint/no-explicit-any */
