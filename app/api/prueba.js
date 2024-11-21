// Create a new Date object
const currentDate = new Date();

// Get the day, month, and year from the Date object
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
const year = currentDate.getFullYear();

// Format the date as dd/mm/yyyy
const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

// Output the formatted date
console.log(formattedDate);
