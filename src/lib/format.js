import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const fmtDate = (ts) =>
  format(new Date(ts), "yyyy년 MM월 dd일 HH:mm", { locale: ko });