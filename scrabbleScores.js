let fs = require("fs");

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

//Helper function to calculate score for a single word
function getSingleWordScore(inputWord) {
    let word = inputWord.toUpperCase();
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        score += getCharScore(word[i]);
    }
    return score;

}

function removeSpecialChars(bookContent) {
    const specialCharRegex = /[.,"();*#\[\]\/\/?!@%_“$:”0-9‘]/g;
    return bookContent.replace(specialCharRegex, " ");
}

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