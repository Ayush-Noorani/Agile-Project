export const getNameAcronym = (name: string) => {
  const words = name.split(" ");
  const acronym = words.reduce((result, word) => result + word[0], "");
  return acronym.toUpperCase();
};

export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
