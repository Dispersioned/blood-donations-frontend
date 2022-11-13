import { format, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';

export function formatDate(date: Date | string) {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return format(parsed, 'kk:mm, dd LLL yyyy', { locale: ru });
}
