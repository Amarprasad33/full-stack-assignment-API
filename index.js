const express = require('express')
const app = express()
const port = 3001

const USERS = [
  {
    userID: 3786,
    email: 'admin@gmail.com',
    password: "dummyUser3",
  },
  {
    userID: 2431,
    email: 'raihca@gmail.com',
    password: "dummyUser",
  },
  {
    userID: 2935,
    email: 'aiuerq@gmail.com',
    password: "dummyUser2",
  },
  {
    userID: 1948,
    email: 'hfaefi@gmail.com',
    password: "dummyUser3",
  },
];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    },],
    questionID: '38fn2b93h1',
  },
  {
    title: "Average",
    description: "Given an array , return the Average of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "3"
    },],
    questionID: '19fp2u93t5',
  },
  {
    title: "Linear search",
    description: "Given an array , return the index of 4 in the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "3"
    },],
    questionID: '98um2x43w7',
  },
  {
    title: "Prime Cound",
    description: "Given an array , return the number of prime numbers in the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "2"
    },],
    questionID: '74gv2z94t8',
  },

  
];


const SUBMISSION = [
    {
      userID: 2431,
      questionID: '38fn2b93h1',
      code: `Random test code`,
      accepted: true,
    },
    {
      userID: 9381,
      questionID: '98um2x43w7',
      code: `Random calc code`,
      accepted: false,
    },
    {
      userID: 2935,
      questionID: '74gv2z94t8',
      code: `Random code`,
      accepted: true,
    },
    {
      userID: 1948,
      questionID: '19fp2u93t5',
      code: `Random dry code`,
      accepted: true,
    },
]
 
app.post('/signup', (req, res) => {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  const ifExist = USERS.find(user => user.email === email);
  if(ifExist){
    res.status(400).send('User on same email already exits');
  }
  const random = Math.floor(Math.random() * 1000)+1;
  const newUser = {random, email, password};
  USERS.push(newUser);

  // return back 200 status code to the client
  res.status(2000).send('Welcome to LeetCode');
})


app.post('/login', (req, res) => {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;


  // Check if the user with the given email exists in the USERS array
  const userExist = USERS.find(user => user.email === email);
  // Also ensure that the password is the same
  
  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  if(!userExist || userExist.password !== password){
    res.status(401).send("Invalid Username or Password")
    return;
  }

  res.status(200).json({
    message: "Logged in",
    token: `${Math.floor(Math.random() * 1000)+1}${email}`,
  });
})

app.get('/questions', (req, res) => {

  //return the user all the questions in the QUESTIONS array
  res.status(200).json(QUESTIONS);
})

app.get("/submissions/:userID/:questionID", (req, res) => {
   // return the users submissions for this problem
   const { userID, questionID } = req.params;

   const existSubmissions = SUBMISSION.filter((sub) => {
    sub.userID === userID && sub.questionID === questionID
   });

   res.status(200).json(existSubmissions);

  res.send("Hello World from route 4!")
});


app.post("/submissions", (req, res) => {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   const { userID, questionID, code } = req.body;

   const ifExist = USERS.find(user => user.userID === userID );
   const qs = QUESTIONS.find(question => question.questionID === questionID );

   if(!ifExist || !qs){
    res.status(400).send('User does not exist');
   }

   SUBMISSION.push({
      userID,
      questionID,
      code,
      accepted: true,
   });

   
  res.status(200).send('Submitted');
});

// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
app.post('/admin/problems', (req, res) => {
  const {email} = req.body;
  const { title, description, testCases } = req.body;

  const isAdmin = (email === 'admin@gmail.com');

  if(isAdmin){
    res.status(401).send('You have to be an Admin to add Problems');
    return;
  }

  const questionID = Math.floor(Math.random() * 9000)+1000;

  QUESTIONS.push({
    title,
    description,
    testCases,
    questionID,
  })

  res.status(200).send('Added Problem');
})

app.listen(port, function() {
  console.log(`Your app listening on port ${port}`)
})