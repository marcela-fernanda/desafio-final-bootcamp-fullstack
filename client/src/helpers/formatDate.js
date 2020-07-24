import moment from 'moment';
import 'moment/locale/pt-br';

export default function formatDate(date) {
  const epoch = moment(date, 'YYYY-MM').valueOf();
  const newEpoch = moment(epoch);
  const newDate = newEpoch.locale('pt-br').format('MMM/YYYY');
  const finalDate = newDate.charAt(0).toUpperCase() + newDate.slice(1);

  return finalDate;
}
