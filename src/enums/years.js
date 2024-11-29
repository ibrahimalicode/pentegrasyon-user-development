const currentYear = new Date().getFullYear(); // Dynamically get the current year
const Years = [
  { label: `${currentYear - 1}`, value: currentYear - 1 }, // Previous year
  { label: `${currentYear}`, value: currentYear }, // Current year
];

export default Years;
