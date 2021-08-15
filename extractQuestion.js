const fs = require('fs');

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('./questions.txt'),
});

const parseQuestions = async (callback) => {
  const questions = [];
  let i = 0;
  lineReader.on('line', (line) => {
    const lineSplit = line.split(' ');

    if (
      lineSplit[0].match(/^[0-9]/) &&
      (lineSplit[0].endsWith('.') || lineSplit[0].endsWith(')'))
    ) {
      // i++;
      const question_id = lineSplit[0].slice(0, lineSplit[0].length - 1);

      console.log({
        question_id,
        name: lineSplit.slice(1, lineSplit.length).join(' '),
      });

      questions.push({
        question_id,
        name: lineSplit.slice(1, lineSplit.length).join(' '),
      });
    }
  });

  lineReader.on('close', () => callback(questions));
};

parseQuestions((result) => {
  const questionsParsed = JSON.stringify(result);
  fs.writeFileSync('questions_parsed.json', questionsParsed);
});
