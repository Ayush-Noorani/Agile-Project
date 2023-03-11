export const getNameAcronym = (name: string) => {
  const words = name.split(" ");
  const acronym = words.reduce((result, word) => result + word[0], "");
  return acronym.toUpperCase();
};
