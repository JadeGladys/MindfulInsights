import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

interface Research {
  topic: string;
  objective: string;
  startDate: string;
  abstract: string;
}

interface PbrResultsProps {
  topic: string;
}

const PbrResults: React.FC<PbrResultsProps> = ({ topic }) => {
  const [researches, setResearches] = useState<Research[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        console.log(`Fetching researches for topic: ${topic}`);
        const response = await axios.get(`http://localhost:3000/api/research/topic/${topic}/status/published`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log("Fetched researches:", response.data);
        setResearches(response.data);
      } catch (error) {
        console.error("Error fetching researches:", error);
      }
    };

    if (topic) {
      fetchResearches();
    }
  }, [accessToken, topic]);
  return (
    <div>
      <h1 className="result-collab">Results</h1>
      <div className="row mb-2">
        {researches.map((research, index) => (
          <div className="col-md-6" key={index}>
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>{research.topic}</h2>
              <p>{research.abstract}</p>
              <button className="btn btn-outline-light" type="button">Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PbrResults