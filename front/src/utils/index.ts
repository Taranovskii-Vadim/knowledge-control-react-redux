import { format } from 'date-fns';

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const formatDate = (input: Date): string => format(input, 'dd.MM.yyyy');

export const convertDateFromStringToDate = (input: string): Date => new Date(input);
