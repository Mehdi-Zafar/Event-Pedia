
export function formatDate(inputDate:string) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const parts = inputDate.split('-');
    const day = parseInt(parts[2]);
    const month = parseInt(parts[1]) - 1; // Months are 0-based in JavaScript
    const year = parseInt(parts[0]);
  
    const formattedDate = `${day} ${months[month]} ${year}`;
    return formattedDate;
  }

export function formatTime(inputTime:string) {
    const [hours, minutes] = inputTime.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
  
    const formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    return formattedTime;
  }