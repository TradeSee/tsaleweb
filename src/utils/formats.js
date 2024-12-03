import { format } from 'date-fns';

export default function formatsDate(dateString) {
    const dateInMillis = dateString * 1000;
    const date = new Date(dateInMillis);
    const options = { month: '2-digit', day: '2-digit', year: '4-digit' };
    return format(date, 'MM/dd/yy', options);
}