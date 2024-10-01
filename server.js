// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end('Hello World');
// })

// server.listen(5000, () => {
//     console.log('Server listening at port 5000');
// })

// const http = require('http');

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.end('This is my Home Page');
//     } else if(req.url === '/about'){
//         res.end('This is my About Page');
//     } else if(req.url === '/contact'){
//         res.end('This is my Contact Page');
//     } else {
//         res.end('404, Resource Not Found');
//     }
// })

// server.listen(5000, () => {
//     console.log('Server listening at port 5000');
// })

// const http = require('http');
// const fs= require('fs')

// const server = http.createServer((req, res) => {
//   let filepath = './public';

//   switch (req.url) {
//     case "/":
//       filepath += "/index.html";
//       break;

//     case "/about":
//       filepath += "/about.html";
//       break;

//     case "/contact":
//       filepath += "/contact.html";
//       break;

//     default:
//       filepath += "/404.html";
//       res.statusCode = 404;
//       break;
//   }

//   fs.readFile(filepath, (err, data) => {
//     if (err) {
//       res.end("Internal Server Error");
//       console.log(err);
//     } else {
//       res.end(data);
//     }
//   });
// });

// server.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

const rs = require("readline-sync");

let score = 0;

// Ask for the user's name
let username = rs.question("Please enter your name: ");
console.log("Welcome, " + username + " to the Cricket Quiz App!");

// Define the questions with a time limit
let questions = [
  {
    question: 'Who is known as the "God of Cricket"? ',
    answer: 'Sachin Tendulkar',
    timeLimit: 5000, // 5 seconds
  },
  {
    question: 'How many players are there in a cricket team? ',
    answer: '11',
    timeLimit: 3000, // 3 seconds
  },
  {
    question: 'What is the maximum number of overs in a One Day International (ODI)? ',
    answer: '50',
    timeLimit: 4000, // 4 seconds
  },
  {
    question: 'Which country won the first Cricket World Cup? ',
    answer: 'England',
    timeLimit: 5000, // 5 seconds
  },
  {
    question: 'Who has the record for the highest individual score in Test cricket? ',
    answer: 'Brian Lara',
    timeLimit: 6000, // 6 seconds
  },
];

// Function to ask a timed question
const askTimedQuestion = (questionObj) => {
  return new Promise((resolve) => {
    let timer;

    console.log(`${questionObj.question} (You have ${questionObj.timeLimit / 1000} seconds to answer.)`);
    
    // Set a timer to automatically resolve if the user doesn't answer in time
    timer = setTimeout(() => {
      console.log("Time's up! Moving to the next question...");
      resolve(null); // No answer given
    }, questionObj.timeLimit);

    // Ask the question and wait for the answer
    let userAnswer = rs.question('');

    clearTimeout(timer); // Clear the timer if answered in time
    resolve(userAnswer); // Resolve with the user's answer
  });
};

// Function to start the quiz
const startQuiz = async () => {
  for (const question of questions) {
    const userAnswer = await askTimedQuestion(question);

    // Check if the answer is correct
    if (userAnswer === null) {
      console.log("You didn't answer in time.");
    } else if (userAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Wrong! The correct answer is: " + question.answer);
    }
    console.log(); // Blank line between questions
  }

  // Display final score
  console.log(`Quiz complete! Your score is: ${score} out of ${questions.length}.`);
};

// Start the quiz
startQuiz();
