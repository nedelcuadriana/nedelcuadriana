import { useState } from 'react';
import './CreateJobPosting.css';
import JobPostingList from './JobPostingList';
const SERVER = 'http://localhost:8080';

function CreateJobPosting(props) {


    const [description, setDescription] = useState('');
 
    const [deadline, setDeadline] = useState('');
    const [component, setComponent] = useState("default");

    const handleClick = async () => {
        const jobPosting = { description, deadline};

        const response = await fetch(`${SERVER}/jobposting/create`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobPosting),
        });
        const data = await response.json();

        alert('Job Posting added');
        
    };

    return (
        <div>
        {component === "JobPostingList" ? (
            <JobPostingList />
        ):(
        <div className='create-job-posting'>
            <div className='inputText'>
                <text id='text1'>Description </text>
                <input id="writeText1" type="text" placeholder="description" onChange={(evt) => setDescription(evt.target.value)} />
            </div>
            <div className="inputText">
                <text id="text2">Deadline </text>
                <input id="writeText2" type="text" placeholder="deadline" onChange={(evt) => setDeadline(evt.target.value)} />
            </div>
            <div className="button">
                <input type="button" id="btnAdd" value="Add job posting" onClick={handleClick} />
            </div>
            <input
              className="button"
              id ="btnShowJobPostings"
              type="button"
              onClick={() => {
                setComponent("JobPostingList");
              }}
              value="Show Job Postings"
            />
        </div>
         )} 
        </div>
    );
}

export default CreateJobPosting;