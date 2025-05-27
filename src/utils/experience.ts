
export const calculateYearsOfExperience = (): number => {
  const startDate = new Date('2019-08-06');
  const currentDate = new Date();
  
  const diffInMilliseconds = currentDate.getTime() - startDate.getTime();
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.floor(diffInYears * 10) / 10; // Round to 1 decimal place
};

export const getExperienceText = (): string => {
  const years = calculateYearsOfExperience();
  return `${years}+ years`;
};
