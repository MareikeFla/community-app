export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) {
    console.error('Invalid date string:', dateString);
    return ''; 
  }
  return `${day}.${month}.${year}`;
}
}

export function getFormattedTodaysDate () {
  const today = new Date();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  return `${today.getFullYear()}-${month}-${day}`;
};
