import '../css/workspace.css';
import React, { useEffect, useState } from "react";
import Wrapper from "../components/wrapper";
import axios from 'axios';
import CreateFormModal from "../components/create-research";
import SubmitResearch from '../components/submit-research';
import { useAuth } from '../AuthContext';

interface Research {
  research_ID: number;
  topic: string;
  objective: string;
  startDate: string;
  endDate: string;
  abstract: string;
  status: string;
  recordedBy: {
    id: number;
    userID: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    password: string;
  };
}

const Workspace: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showSubmitResearch, setShowSubmitResearch] = React.useState(false);
  const [selectedResearchID, setSelectedResearchID] = React.useState<number | null>(null);
  
  const { accessToken, userID } = useAuth();
  const [researches, setResearches] = useState<Research[]>([]);
  
  const handleShow = () => setShowCreateModal(true);
  const handleClose = () => setShowCreateModal(false);
  
  const handleShowSubmit = (research_ID: number) => {
    console.log('Selected research ID:', research_ID); // Debug log
    setSelectedResearchID(research_ID);
    setShowSubmitResearch(true);
  };
  const handleCloseSubmit = () => {
    setSelectedResearchID(null);
    setShowSubmitResearch(false);
  };

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/user/${userID}/status/pending`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setResearches(response.data);
      } catch (error) {
        console.error("Error fetching researches:", error);
      }
    };

    if (userID) { 
      fetchResearches();
    }
  }, [accessToken, userID]);

  return (
    <Wrapper>
      <div className="dashboard-container">
        <h1 className="h4-text-wrapper">PROGRESS BAR</h1>
        <div className="progress-stacked">
          <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} style={{ width: `${15}%` }}>
            <div className="progress-bar" style={{ backgroundColor: '#0074CC' }}> Submited</div>
          </div>
          <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} style={{ width: `${30}%` }}>
            <div className="progress-bar" style={{ backgroundColor: '#f8be00' }}>Work in progress</div>
          </div>
          <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} style={{ width: `${20}%` }}>
            <div className="progress-bar" style={{ backgroundColor: '#319F43' }}>Started</div>
          </div>
        </div>
        <div className="create-container">
          <a className="btn research-btn create-btn" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle icon-create" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Create New
          </a>
          <a href="#" className="btn research-btn create-btn" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle icon-create" viewBox="0 0 16 16">
              <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z" />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
            </svg>
            Add new
          </a>
        </div>
        <CreateFormModal show={showCreateModal} handleClose={handleClose} />
        <div className="main-workspace-container">
          {researches.map((research, index) => (
            <div className="workspace-container" key={index}>
              <div className="card">
                <div className="feature col">
                  <div className="d-inline-flex align-items-center justify-content-center bg-gradient fs-2 mb-3 icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" icon-collection" viewBox="0 0 16 16">
                      <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z" />
                    </svg>
                  </div>
                  <h3 className="title">{research.topic}</h3>
                  <p className="description">{research.objective}</p>
                  <div className="content">
                    <h2 className="definition-title">DEFINITION</h2>
                    <p className="definition-text">{research.abstract}</p>
                  </div>
                  <a href={`/workspace/ResearchProject/${research.research_ID}`} className="btn research-btn">
                    Continue writing
                  </a>
                  <hr className="my-3" />
                  <div className='cardsubmitbutton'>
                    <a className="btn research-btn" onClick={() => handleShowSubmit(research.research_ID)}>
                    Submit
                    </a>
                  </div>
                  {selectedResearchID === research.research_ID && (
                    <SubmitResearch
                      show={showSubmitResearch}
                      handleClose={handleCloseSubmit}
                      research_ID={selectedResearchID}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <h1 className="h2 text-wrapper">Project Summary</h1>
        <div className="summary-wrapper">
          <div className="project-summary">
            <p>Showing 1 to {researches.length} of {researches.length} entries</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Workspace;
