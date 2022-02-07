import { useState } from 'react';
import './CreateCandidate.css';

const SERVER = 'http://localhost:8080';

function CreateCandidate(props) {

    const [name, setName] = useState('');
    const [cv, setCv] = useState('');
    const [email, setEmail] = useState('');

    const [jobPostingId, setJobPostingId] = useState('');
    const [component, setComponent] = useState("default");

    const[jobPosting, setJobPosting] = useState('');

    const getJobPostingId = async () => {
        const response = await fetch(`${SERVER}/jobposting/all?description=${jobPosting}`);
        const data = await response.json();
        setJobPostingId(data[0].id);
    }


    const handleClick = async () => {
        const candidate = { name, cv, email };

        getJobPostingId();
        const response = await fetch(`${SERVER}/jobpostings/${jobPostingId}/candidates`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(candidate),
        });



        alert('Candidate created');


    }



    return (
        <div>
            {component === "CandidateList" ? (
                <div></div>
            ) : (
                <div className='create-candidate'>
                    <div className='inputText'>
                        <text id='text1'>Name</text>
                        <input id='writeText1' type="text" placeholder="name" onChange={(evt) => setName(evt.target.value)} />
                    </div>
                    <div className='inputText'>
                        <text id='text1'>CV</text>
                        <input id='writeText2' type="text" placeholder="CV" onChange={(evt) => setCv(evt.target.value)} />
                    </div>
                    <div className='inputText'>
                        <text id='text3'>Email</text>
                        <input id='writeText3' type="text" placeholder="email" onChange={(evt) => setEmail(evt.target.value)} />
                    </div>
                    <div className="inputText">
                        <text id="text4">Job Posting</text>
                        <input id='writeText4' type="text" placeholder="JobPosting" onChange={(evt) => setJobPosting(evt.target.value)} />
                    </div>

                    <div className="button">
                        <input type="button" id="btnAddCandidate" value="Add Candidate" onClick={handleClick} />
                    </div>
                    <input
                        className="button"
                        id="btnShowCandidates"
                        type="button"
                        onClick={() => {
                            setComponent("CandidateList");
                        }}
                        value="Show Candidates"
                    />
                </div>
            )}
        </div>
    );

}

export default CreateCandidate;