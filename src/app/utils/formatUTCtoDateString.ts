import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatUTCtoDateString(date: Date) {
  return formatDistanceToNow(date, {
    locale: ptBR,
  }).replace('cerca de', 'há');
}
