import React,{useEffect,useState} from 'react';
import axios from 'axios';

const App = () => {
    const issueBody =     { id:'',title:'',description:''};
    const [issues,setIssues] = useState([]);
    const [newIssue,setNewIssue] = useState(issueBody);

    useEffect(() => {
        fetchIssues();
    }, []);


    //Function for getting all the issues
    const fetchIssues = async () =>{
        const response = await axios.get();
        setIssues(response.data);
    }'http://localhost:3000/issues'

    const createIssues = async() =>{
        const axio.post('http://localhost:3000/issues',newIssue);
        fetchIssues();
    };

    const updateIssue = async(id)=>{
        const issueToUpdate =  issues.find( issue=> issue.id === id);
        if (issueToUpdate){
            await axios.put(`http://localhost:3000/issues/${id}`,issueToUpdate);
        }
        fetchIssues();

    };

    const deleteIssue = async(id) =>{
        await axios.delete(`http://localhost:3000/issues/${id}`,issueToUpdate);
        fetchIssues();
    };

    return (
        <div>
            <h1>
                Issue Managment
            </h1>
            <div>
                <input type="text" placeholder="ID" value={newIssue.id} onChange ={(e)=>setNewIssue({...newIssue,id:e.target.value})}/>
                <input type="text" placeholder="Title" value={newIssue.title} onChange ={(e)=>setNewIssue({...newIssue,title:e.target.value})}/>
                <input type="text" placeholder="Description" value={newIssue.title} onChange ={(e)=>setNewIssue({...newIssue,title:e.target.value})}/>
                <button onClick={createIssues}> Creat Issue</button>
            </div>
            <ul>
                {issues.map(issue =>(
                    <li key={issue.id}>
                        {issue.title} - {issue.description}
                        <button onClick={() => updateIssue(issue.id)}> Update Issue</button>
                        <button onClick={() => deleteIssue(issue.id)}> Delete Issue</button>

                    </li>
                ))};
            </ul>

        </div>

    );
};