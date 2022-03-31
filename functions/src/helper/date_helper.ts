import dayjs from 'dayjs';

export const formatDateMonth = (date: Date): string => {
  return dayjs(date).format('yyyy/M');
};

export const formatDateMonthJa = (date: Date): string => {
  return dayjs(date).format('yyyy年M月');
};

export const formatDateJa = (date: Date): string => {
  return dayjs(date).format('yyyy年M月d日');
};

export const formatDate = (date?: Date | null): string => {
  if (!date) return '';
  return dayjs(date).format('yyyy/M/d');
};

export const formatInputDate = (date: Date): string => {
  return dayjs(date).format('yyyy-MM-dd');
};

export const parseDate = (date: string): Date => {
  return dayjs(date).toDate();
};
