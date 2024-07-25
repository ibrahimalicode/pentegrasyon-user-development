export function formatDateString(dateString, joint = "/") {
  const date = new Date(dateString);

  // Extract the month, day, and year
  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last 2 digits of the year

  const formattedDate = `${month}${joint}${day}${joint}${year}`;
  return formattedDate;
}
