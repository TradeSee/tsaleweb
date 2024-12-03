import { format } from 'date-fns';

export default function formatDate(dateString) {
    const date = new Date(dateString);  
    const options = { month: 'short', day: 'numeric', year: 'numeric' };  
    return format(date, 'MMM, dd, yyyy', options);
  }