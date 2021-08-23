const fs = require("fs");

const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream("./questions.txt"),
});

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];

const parseQuestions = async (callback) => {
    const questions = [];
    const options = [];
    let question_id;
    let answer_id = 0;
    let alphabetIndex = 0;

    lineReader.on("line", (line) => {
        const lineSplit = line.replace(/\t/g, "").split(" ");

        /* questions */
        if (
            lineSplit[0].match(/^[0-9]/) &&
            (lineSplit[0].endsWith(".") || lineSplit[0].endsWith(")"))
        ) {
            question_id = lineSplit[0].slice(0, lineSplit[0].length - 1);
            alphabetIndex = 0;

            questions.push({
                id: question_id,
                topics_id: "1",
                questions: lineSplit.slice(1, lineSplit.length).join(" "),
            });
        } else {
            /* options */
            if (question_id && line.trim() !== "") {
                // if (line.includes('\t'))
                //   console.log(
                //     line,
                //     lineSplit[0].endsWith('.'),
                //     console.log(lineSplit[0])
                //   );

                const text = lineSplit[0].endsWith(".")
                    ? lineSplit.slice(1, lineSplit.length).join(" ")
                    : line;

                // console.log({
                //     id: answer_id,
                //     test_id: question_id,
                //     option: alphabet[alphabetIndex],
                //     answer: text,
                // });

                options.push({
                    id: answer_id,
                    test_id: question_id,
                    option: alphabet[alphabetIndex],
                    answer: text,
                });
                answer_id++;
                alphabetIndex++;
            }
        }
    });

    lineReader.on("close", () => callback(questions, options));
};

parseQuestions((questions, options) => {
    const questionsParsed = JSON.stringify(questions);
    const optionsParsed = JSON.stringify(options);
    fs.writeFileSync("questions_parsed_test.json", questionsParsed);
    fs.writeFileSync("options_parsed_test.json", optionsParsed);
});
