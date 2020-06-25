let fs = require("fs");
/**
 * Returns the score of a letter (char) according to the Scrabble game rules.
 * @param {char} char a letter or character to be used for calculating the score.
 * @returns {number} an integer score for the passed character.
 */
function getCharScore(char) {
    const onePointLetters = "EAIONRTLSU";
    const twoPointLetters = "DG";
    const threePointLetters = "BCMP";
    const fourPointLetters = "FHVWY";
    const fivePointLetters = "K";
    const eightPointLetters = "JX";
    const tenPointLetters = "QZ";
    if (onePointLetters.indexOf(char) != -1) {
        return 1;
    }
    if (twoPointLetters.indexOf(char) != -1) {
        return 2;
    }
    if (threePointLetters.indexOf(char) != -1) {
        return 3;
    }
    if (fourPointLetters.indexOf(char) != -1) {
        return 4;
    }
    if (fivePointLetters.indexOf(char) != -1) {
        return 5;
    }
    if (eightPointLetters.indexOf(char) != -1) {
        return 8;
    }
    if (tenPointLetters.indexOf(char) != -1) {
        return 10;
    }
    return 0;
}

/**
 * Returns the score of a single word according to the Scrabble game rules.
 * @param {string} inputWord a word to be used for calculating the score.
 * @returns {number} an integer score for the passed word.
 */
function getSingleWordScore(inputWord) {
    let word = inputWord.toUpperCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        score += getCharScore(word[i]);
    }
    return score;

}

/**
 * Returns a clean string with all the special characters replaced by an empty string.
 * @param {string} data - a multiline string with each line containing words or strings.
 * @returns {string} string data - multiline string without special characters.
 */
function removeSpecialChars(data) {
    const specialCharRegex = /[.,"();*#\[\]\/\/?!@%_“$:”0-9‘]/g;
    return data.replace(specialCharRegex, " ");
}

/**
 * Reads a book and prints out the word with the highest score and its score according to the Scrabble game rules.
 * @param {string} bookPath a path of the book to read
 * @returns {number} an integer score for the passed word.
 */
function getHighestScoringWord(bookPath) {

    fs.readFile(bookPath, "utf8", (error, data) => {
        if (error) throw `There was a problem reading your book ${error}`;
        let cleanData = removeSpecialChars(data).replace(/(\r\n|\n|\r)/gm, " ");

        let words = cleanData.split(" ");
        //console.log(words);
        let highestScoringWord = words[0];
        let highestWordScore = getSingleWordScore(highestScoringWord);
        for (let i = 0; i < words.length; i++) {
            let currentWordScore = getSingleWordScore(words[i]);
            if (currentWordScore > highestWordScore) {
                highestScoringWord = words[i];
                highestWordScore = currentWordScore;
            }
        }
        console.log(`${highestScoringWord} : ${highestWordScore}`);

    });
}
getHighestScoringWord("war_and_peace.txt");