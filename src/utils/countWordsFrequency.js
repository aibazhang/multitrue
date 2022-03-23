/*

const wordsFrequency = (sentences) => {
  const sentencesGroup = {};

  // #1 remove punctuation and split by space
  const newSentences = sentences
    .toLowerCase()
    .match(/[a-zA-Z]+/g)
    .sort();

  newSentences.forEach((e) => {
    !sentencesGroup[e] ? (sentencesGroup[e] = 1) : sentencesGroup[e]++;
  });

  return {
    total: newSentences.length,
    data: sentencesGroup
  };
};

module.exports = wordsFrequency;

*/

// English stopwords via https://gist.github.com/sebleier/554280
