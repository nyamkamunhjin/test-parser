const csv = require('csv-parser');
const fs = require('fs');

const results = [];
fs.createReadStream('./answers.csv')
  .pipe(csv())
  .on('data', (data) => {
    const question_id = data['№'];
    const answer = data["Tsoomoo's version"];

    if (
      answer === 'check' ||
      answer === 'Monday' ||
      answer === 'no correct answer (within 5 w/d)' ||
      answer === 'a-incorrect question'
    ) {
      console.log('skipping');
    } else {
      answer.split('').forEach((each) => {
        results.push({
          question_id,
          answer: each,
        });
      });
    }
  })
  .on('end', () => {
    console.log(results);
    fs.writeFileSync('correct_answers_parsed.json', JSON.stringify(results));
  });
