import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

interface Research {
  topic: string;
  objective: string;
  startDate: string;
  abstract: string;
}

interface CollabResultsProps {
    topic: string;
}

const CollabResults: React.FC<CollabResultsProps> = ({ topic }) => {
  const [researches, setResearches] = useState<Research[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/topic/${topic}/status/pending`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setResearches(response.data);
      } catch (error) {
        console.error("Error fetching researches:", error);
      }
    };

    if (topic) { 
      fetchResearches();
    }
  }, 
  [accessToken, topic]);

  return (
    <div>
      <h1 className="result-collab">Results</h1>
      <div className="row mb-2">
        {researches.map((research, index) => (
          <div className="col-md-6" key={index}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{research.objective}</strong>
                <h3 className="mb-0">{research.topic}</h3>
                <div className="mb-1 text-body-secondary">{new Date(research.startDate).toLocaleDateString()}</div>
                <p className="card-text mb-auto">{research.abstract}</p>
                <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                  Request Collaboration
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </a>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img className="thumbnail-img" src={process.env.PUBLIC_URL + '/assets/images/collab-bg.PNG'} alt="Image" style={{ height: '280px', width: '200px' }}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollabResults;
