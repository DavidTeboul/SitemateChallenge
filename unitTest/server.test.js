const request = require('supertest');
const express= require('express');
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

discribe('Issue API', () =>{
   it('creat new Issue ?', async()=>{
       const newIssue =     { id:4,title:'Issue4',description:'Description4'};
       const response = await request(app).post('/issues').send(newIssue);
       expect(response.statusCode).toBe(201);
       expect(response.body).toEqual(newIssue);
   }) ;

    it('get all Issue ?', async()=>{
        const response = await request(app).get('/issues');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(4);
    })

    it('Update new Issue ?', async()=>{
        const updateIssue =     { id:1,title:'Update Issue 1',description:'Description4'};
        const response = await request(app).put('/issues/1').send(updateIssue);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(updateIssue);
    }) ;


    it('Delet Issue ?', async()=>{
        const response = await request(app).delete('/issues/1');
        expect(response.statusCode).toBe(204);

        const readResponse = await request(app).get('/issues');
        expect(readResponse.body.length.tobe(3)); // check if i delete issue ellement from the dataDict Issues
        expect(response.body.length).toBe(4);
    })

});