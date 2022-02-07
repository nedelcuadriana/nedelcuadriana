import { useEffect, useState } from 'react';


import JobPosting from './JobPosting'
import './JobPostingList.css'
import UpdateJobPosting from './UpdateJobPosting'

const SERVER = 'http://localhost:8080';


function JobPostingList(props) {
    const [jobPostings, setJobPostings] = useState([]);

    const getJobPostings = async () => {
        const response = await fetch(`${SERVER}/jobPosting/all`);
        const data = await response.json();
        setJobPostings(data);
    };

    useEffect(() => {
        getJobPostings();
    });

    return (
        <div>
            <text id='text'>Job Postings</text>
            <div className='jobposting-list' style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                {jobPostings.map((e) => (
                    <JobPosting key={e.id} item={e} />
                ))}
            </div>
            <div className='update-jobposting'>
                <UpdateJobPosting/>
            </div>
        </div>

    );
}


export default JobPostingList;