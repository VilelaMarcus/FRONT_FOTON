export default function calculateDaysPassedFromDate(dateString) {
    const dateParts = dateString.split('/');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-indexed
    const year = parseInt(dateParts[2]);
  
    const givenDate = new Date(year, month, day);
    const currentDate = new Date();
  
    const timeDifference = currentDate - givenDate;
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysPassed;
  }