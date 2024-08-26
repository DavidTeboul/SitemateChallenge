const express = require('express');
const bodyParser= require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());


//exemple of issues to pass on REST API
let issues = [
    { id:1,title:'Issue1',description:'Description1'},
    { id:2,title:'Issue2',description:'Description2'},
    { id:3,title:'Issue3',description:'Description3'},
]

//Create: accepts a JSON object & prints/logs the object
app.post('/issues',(req,res)=>{
    const newIssueToSend = req.body;
    issues.push(newIssueToSend);
    console.log('Issue Created',newIssueToSend);
    res.status(201).json(newIssueToSend);

});

// Read: requests a JSON object & prints it out
app.get('/issues',(req,res)=>{
   res.json(issues);
   res.status(200).send();
});

//Update: sends a JSON object to the server

app.put('/issues/:id',(req, res)=>{
    const {id} = req.params;
    const updateIssues = req.body;
    issues = issues.map(issue => (issue.id === parseInt(id) ? updatedIssue : issue));
    console.log('Updated Issue:', updateIssues);
    res.json(updateIssues);
})

// Delete: requests the server delete an issue

app.delete('/issues/:id',(req, res)=>{
    const {id} = req.params;
    issues = issues.filter(issue => (issue.id !== parseInt(id)));
    console.log('Delete Issue:', deleteIssues);
    res.status(204).send();
})

app.listen(PORT, ()=>{
   console.log('Server is running on PORT: $(PORT)');
});