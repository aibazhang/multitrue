const stopwords = require('./stopwords-en.json');

// English stopwords via https://gist.github.com/sebleier/554280
const countWordsFrequency = (sentences) => {
  const result = {};

  // remove punctuation and split by space
  const terms = sentences.toLowerCase().match(/[a-zA-Z]+/g);

  terms.forEach((e) => {
    if (!stopwords.stopwords.includes(e)) {
      const name = e.toUpperCase();
      if (result[name]) {
        result[name] += 1;
      } else {
        result[name] = 1;
      }
    }
  });
  return Object.entries(result)
    .map(([key, value]) => ({
      name: key,
      value,
    }))
    .sort((a, b) => b.value - a.value);
};

module.exports = countWordsFrequency;
