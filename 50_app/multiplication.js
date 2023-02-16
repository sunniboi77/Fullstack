const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(__dirname);

readline.question("How many times should the timer run? ", function (numberOfRuns) {
    let count = 0;

    const intervalId = setInterval(() => {
        console.log("hello");
        count++;
        if (count === Number(numberOfRuns)) {
            clearInterval(intervalId);
            readline.close();
        }
    }, 1000);
});



const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let startTime;
let answers = [];
let correctCount = 0;
let incorrectCount = 0;

function askQuestion(i, j, repeated) {
    startTime = new Date();
    let question = `What is ${i} x ${j}? `;
    rl.question(question, function (answer) {
        let correct = answer == i * j;
        let endTime = new Date();
        let elapsedTime = endTime - startTime;
        answers.push({
            question: question,
            answer: answer,
            correct: correct,
            time: elapsedTime,
            repeated: repeated
        });
        console.log(`Your answer was ${correct ? "correct" : "incorrect"}`);
        if (correct) {
            correctCount++;
        } else {
            incorrectCount++;
        }
        if (j === 11 || answers.length === 20) {
            fs.writeFileSync('answers.json', JSON.stringify(answers));
            console.log("Done!");
            rl.close();
        } else {
            if (correctCount % 2 === 0 && incorrectCount > 0) {
                askQuestion(i, j, true);
            } else {
                let newI = Math.floor(Math.random() * 9) + 2;
                let newJ = Math.floor(Math.random() * 9) + 2;
                askQuestion(newI, newJ, false);
            }
        }
    });
}

rl.question("Do you want to set the number for the multiplications? (yes/no) ", function (answer) {
    if (answer.toLowerCase() === "yes") {
        rl.question("Enter the number: ", function (i) {
            askQuestion(i, 2, false);
        });
    } else {
        let i = Math.floor(Math.random() * 9) + 2;
        let j = Math.floor(Math.random() * 9) + 2;
        askQuestion(i, j, false);
    }
});
