const express = require('express')
const App = express();
const port = 3000;

//middleware for parsing the json data 
App.use(express.json())
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
App.use(logger); 
App.use(express.urlencoded({ extended: true }));

App.use('/static', express.static('public')); // Folder: public
const students = [
    {id:1,name:"greet",course:"maths"},
    {id:2,name:"greet1",course:"science"},{id:3,name:"greet2",course:"social"},{id:4,name:"greet3",course:"hindi"},{id:5,name:"greet4",subject:"telugu"}
]

App.get("/",(req,res)=>{
    res.send("welcome to student management system")
})

App.get('/students',(req,res)=>{
    res.json(students)
})

App.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  student ? res.json(student) : res.status(404).send('Student not found');
});

App.post('/students', (req, res) => {
  const { name, course } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    course
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

App.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, course } = req.body;
  const student = students.find(s => s.id === id);

  if (student) {
    student.name = name || student.name;
    student.course = course || student.course;
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

App.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    const deleted = students.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).send('Student not found');
  }
});

App.get('/search', (req, res) => {
  const { course } = req.query;
  const result = students.filter(s => s.course === course);
  res.json(result);
});



App.post('/submit', (req, res) => {
  res.send(`Received: ${req.body.name}`);
});

App.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})