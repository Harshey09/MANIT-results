import React, { useState } from 'react';
import ScholarForm from './ScholarForm';
import StudentDataFetcher from './StudentDataFetcher';

const App = () => {
  const [scholarNo, setScholarNo] = useState(null);
  const [formId, setFormID] = useState(null);
  const [list, setList] = useState([]);

  const handleFormSubmit = (submittedScholarNo) => {
    setScholarNo(submittedScholarNo);
    stringIntString(submittedScholarNo, 50); // Generate list of scholar numbers
  };

  const stringIntString = (scholarNo, count) => {
    const tempList = [];
    for (let i = 0; i < count; i++) {
      const value = parseInt(scholarNo, 10) + i;
      tempList.push(value.toString());
    }
    setList(tempList); // Update list state with generated scholar numbers
  };

  return (
    <div className="App">
      <h1>MANIT Result</h1>
      <ScholarForm onSubmit={handleFormSubmit} />
      {list.map((item, index) => (
        <StudentDataFetcher key={index} scholarNo={item} />
      ))}
    </div>
  );
};

export default App;

