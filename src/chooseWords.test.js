import chooseWord from './chooseWord';

export const words = [
  'natt',
  'kram',
  'flod',
  'rost',
  'berg',
  'mamma',
  'viten',
  'hjälp',
  'plats',
  'räven',
  'diskar',
  'smocka',
  'skugga',
  'snövit',
  'läkare',
];

describe('Tests for chooseWord', () => {
  // Verifies that the function returns a word of the correct length when desiredLength is 4.
  test('chooseWord returns a word of length 4 when desiredLength is 4', () => {
    const word = chooseWord(words, 4, false);
    expect(word.length).toBe(4);
  });

  // Verifies that the function returns a word of the correct length when desiredLength is 5.
  test('chooseWord returns a word of length 5 when desiredLength is 5', () => {
    const word = chooseWord(words, 5, false);
    expect(word.length).toBe(5);
  });

  // Verifies that the function returns a word of the correct length when desiredLength is 6.
  test('chooseWord returns a word of length 6 when desiredLength is 6', () => {
    const word = chooseWord(words, 6, false);
    expect(word.length).toBe(6);
  });

  // Verifies that the function never returns 'natt' when uniqueLetters is true.
  test('chooseWord never returns "natt" when called with parameters (words, 4, true)', () => {
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 4, true);
      expect(word).not.toBe('natt');
    }
  });

  // Verifies that the function can return 'natt' when uniqueLetters is false.
  test('chooseWord can return "natt" when called with parameters (words, 4, false)', () => {
    let foundNatt = false;
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 4, false);
      if (word === 'natt') {
        foundNatt = true;
        break;
      }
    }
    expect(foundNatt).toBe(true);
  });

  // Verifies that the function never returns 'mamma' when uniqueLetters is true.
  test('chooseWord never returns "mamma" when called with parameters (words, 5, true)', () => {
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 5, true);
      expect(word).not.toBe('mamma');
    }
  });

  // Verifies that the function can return 'mamma' when uniqueLetters is false.
  test('chooseWord can return "mamma" when called with parameters (words, 5, false)', () => {
    let foundMamma = false;
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 5, false);
      if (word === 'mamma') {
        foundMamma = true;
        break;
      }
    }
    expect(foundMamma).toBe(true);
  });

  // Verifies that the function never returns 'skugga' when uniqueLetters is true.
  test('chooseWord never returns "skugga" when called with parameters (words, 6, true)', () => {
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 6, true);
      expect(word).not.toBe('skugga');
    }
  });

  // Verifies that the function can return 'skugga' when uniqueLetters is false.
  test('chooseWord can return "skugga" when called with parameters (words, 6, false)', () => {
    let foundSkugga = false;
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 6, false);
      if (word === 'skugga') {
        foundSkugga = true;
        break;
      }
    }
    expect(foundSkugga).toBe(true);
  });

  // Verifies that the function throws an error when no words of the desired length with unique letters exist.
  test('chooseWord throws an error when no words of the desired length with unique letters exist', () => {
    const mockedWords = ['aaaa', 'bbbb', 'cccc', 'dddd', 'eeee'];
    expect(() => chooseWord(mockedWords, 4, true)).toThrow('Inget passande ord finns.');
  });

  // Verifies that the function throws an error when the word list is an empty array and uniqueLetters is false.
  test('chooseWord throws an error when the word list is empty and uniqueLetters is false', () => {
    const emptyWords = [];
    expect(() => chooseWord(emptyWords, 4, false)).toThrow('Inget passande ord finns.');
  });

  // Verifies that the function returns different words when called multiple times.
  test('chooseWord returns different words when called multiple times', () => {
    const wordsSet = new Set();
    for (let i = 0; i < 100; i++) {
      const word = chooseWord(words, 5, false);
      wordsSet.add(word);
    }
    expect(wordsSet.size).toBeGreaterThan(1);
  });
});
