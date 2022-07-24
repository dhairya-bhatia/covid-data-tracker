const splitStrings = (word: string, capitalizeFirstLetter: boolean = false) => {
  const newWord = word.replace(/([A-Z])/g, " $1");
  if (capitalizeFirstLetter) {
    return newWord.charAt(0).toUpperCase() + newWord.slice(1);
  }
  return newWord;
};

export default splitStrings;
