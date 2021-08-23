const csv = require("csv-parser");
const fs = require("fs");

var id = 0;
const results = [];
fs.createReadStream("./answers.csv")
    .pipe(csv())
    .on("data", (data) => {
        const question_id = data["№"];
        const answer = data["Answer"];

        if (
            answer === "check" ||
            answer === "Monday" ||
            answer === "no correct answer (within 5 w/d)" ||
            answer === "a-incorrect question"
        ) {
            console.log("skipping");
        } else {
            answer.split("").forEach((each) => {
                results.push({
                    id,
                    test_id: question_id,
                    answer: each,
                });
            });
            id++;
        }
    })
    .on("end", () => {
        console.log(results);
        fs.writeFileSync(
            "correct_answers_parsed_test.json",
            JSON.stringify(results),
        );
    });
