import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import CreateJobPosting from './components/CreateJobPosting';
import Button from './components/Button';
import CreateCandidate from './components/CreateCandidate';

function App() {

  const [change, setChange] = useState(true);

  return (
    <div>
      {change && <CreateJobPosting/>}

      {!change && <CreateCandidate/>}


      <Button onChange={() => {
        setChange(!change)
      }} />
    </div>
  );
}

export default App;

