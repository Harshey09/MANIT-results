// src/components/ScholarForm.js
import React, { useState } from 'react';
import './ScholarForm.css';

const ScholarForm = ({ onSubmit }) => {
  const [scholarNo, setScholarNo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(scholarNo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="scholarNo">Scholar No:</label>
        <input
          type="text"
          id="scholarNo"
          value={scholarNo}
          onChange={(e) => setScholarNo(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ScholarForm;
