import React, { useEffect, useState } from 'react';
import './StudentDataFetcher.css';

const StudentDataFetcher = ({ scholarNo }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);

  const [final, setFinal] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://academic.manit.ac.in/api/StudentActivity/GetStudentData?scholarno=${scholarNo}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result && result.length > 0) {
          setData(parseInt(result[0]?.FormId, 10)); // Convert FormId to integer
          setName(result[0]?.StudentName); // Assuming StudentName is available
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [scholarNo]);

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        if (data) {
          const response = await fetch(`https://academic.manit.ac.in/api/StudentActivity/GetStudentResult?FormId=${data}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const resultFinal = await response.json();
          setFinal(resultFinal); // Set final data
          setLoading2(false);
        }
      } catch (error) {
        setError2(error);
        setLoading2(false);
      }
    };

    fetchNewData();
  }, [data]);

  if (loading || loading2) {
    return <div className="loader">Loading...</div>;
  }

  if (error || error2) {
    return <div className="error">Error: {error?.message || error2?.message}</div>;
  }

  return (
    <div className="student-data">
      <div>
          <h3>Name: {final[final.length-1].StudentName}</h3>
            <p>Semester: {final[final.length-1].Semester}</p>
            <p>SGPA: {final[final.length-1].SGPA}</p>
            <p>CGPA: {final[final.length-1].CGPA}</p>
            <hr />
      </div>
    </div>
  );
};

export default StudentDataFetcher;
