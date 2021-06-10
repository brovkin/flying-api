export const findChunksWords = ({ searchWords, textToHighlight }) => {
  let chunks = [];
  const textLow = textToHighlight.toLowerCase();

  /**
   * Ищем по regexp границу каждого слова
   * и подсвечиваем
   */

  const regexp = new RegExp(`(\\b${searchWords[0].toLowerCase()})`, 'gi');
  let singleTextWords = [...textLow.split(' '), ...textLow.split(regexp)];

  let fromIndex = 0;
  const singleTextWordsWithPos = singleTextWords.map((s) => {
    const indexInWord = textLow.indexOf(s, fromIndex);
    fromIndex = indexInWord;
    return {
      word: s,
      index: indexInWord,
    };
  });

  searchWords.forEach((sw) => {
    const swLow = sw.toLowerCase();

    if (swLow === ' ') {
      return [];
    }
    /**
     * Убираем дубли example Ka[ka]po
     */
    let previousPartOfWord = null;
    singleTextWordsWithPos.forEach((s) => {
      if (!previousPartOfWord && s.word.startsWith(swLow)) {
        const start = s.index;
        const end = s.index + swLow.length;
        chunks.push({
          start,
          end,
        });

        previousPartOfWord = s.word;
      }
    });

    if (textLow.startsWith(swLow)) {
      const start = 0;
      const end = swLow.length;

      chunks = [{ start, end }];
    }
  });

  return chunks;
};
