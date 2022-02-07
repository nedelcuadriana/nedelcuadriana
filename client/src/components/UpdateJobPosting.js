import { useState } from 'react';
import './UpdateJobPosting.css';
const SERVER = 'http://localhost:8080';

function UpdateJobPosting(props) {
    
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [searchDescription, setSearchDescription] = useState('');

    const [id, setId] = useState(0);


    const handleSearchClick = async () => {

        const response = await fetch(`${SERVER}/jobposting/all?description=${searchDescription}`);
        const data = await response.json();

  
        setId(data[0].id);

        document.getElementById('inputDescription').value = data[0].description;
      

        setDescription(data[0].description);
        setDeadline(data[0].deadline);
    };

    const handleUpdateClick = async () => {

        const jobposting = { description, deadline };

        const response = await fetch(`${SERVER}/jobposting/update/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobposting),
        });

        alert('Job posting updated');

    };

    const handleDeleteClick = async () => {

        const jobposting = { description, deadline };

        const response = await fetch(`${SERVER}/jobposting/delete/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobposting),
        });

        alert('Job posting deleted');
    }

    return (
        <div className='container-update'>
            <div className='search'>
                <text id='text1'>Search Description</text>
                <input id='inputSearch' type="text" placeholder="searchDescription" onChange={(evt) => setSearchDescription(evt.target.value)} />
                <div className="button">
                    <input type="button" id="btnSearch" value="Search job posting" onClick={handleSearchClick} />
                </div>
            </div>
            <div className='update-playlist'>
                <div className='inputText'>
                    <text id='text2'>New Description</text>
                    <input id='inputDescription' type="text" placeholder="description" onChange={(evt) => setDescription(evt.target.value)} />
                </div>
          
                <div className="button">
                    <input type="button" id="btnUpdate" value="Update job" onClick={handleUpdateClick} />
                </div>
                <div className="button">
                    <input type="button" id="btnDelete" value="Delete job" onClick={handleDeleteClick} />
                </div>
            </div>
        </div>
    );
}

export default UpdateJobPosting;