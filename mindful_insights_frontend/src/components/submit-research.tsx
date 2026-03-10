import '../css/CreateResearch.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

interface CreateFormModalProps {
  show: boolean;
  handleClose: () => void;
  research_ID: number | null;
}

interface Research {
  research_ID: number;
  topic: string;
  objective: string;
  description: string;
  abstract: string;
  hypothesis: string;
  areaOfResearch: string;
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

const SubmitResearch: React.FC<CreateFormModalProps> = ({ show, handleClose, research_ID }) => {
  const [research, setResearch] = useState<Research | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchResearchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/${research_ID}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setResearch(response.data);
      } catch (error) {
        console.error('Error fetching research details:', error);
      }
    };

    if (research_ID) {
      fetchResearchDetails();
    }
  }, [accessToken, research_ID]);

  const handleSubmit = async () => {
    if (research) {
      const payload = {
        researchId: research.research_ID,
        recordedById: research.recordedBy.id,
        status: "completed" // Set the status to completed
      };

      console.log('Submitting publication request with payload:', payload);

      try {
        // First, update the research status
        await axios.patch(`http://localhost:3000/api/research/${research.research_ID}`, { status: "completed" }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        // Then, create the publication request
        const response = await axios.post('http://localhost:3000/api/publication', payload, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Publication request created:', response.data);
        setSuccessMessage('Publication request submitted successfully.'); // Set success message
        setTimeout(() => {
          setSuccessMessage("");
          handleClose(); // Close the modal after 2 seconds
        }, 2000);
      } catch (error) {
        console.error('Error creating publication request:', error);
      }
    }
  };

  return (
    <>
      {show && (
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">Research Details</h2>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          {research && (
            <div className="modal-body">
              <div className="form-group">
                <p>Topic:</p>
                <label>{research.topic}</label>
              </div>
              <div className="form-group">
                <p>Abstract:</p>
                <label>{research.abstract}</label>
              </div>
              <div className="form-group">
                <p>Description:</p>
                <label>{research.description}</label>
              </div>
              <div className="form-group">
                <p>Area of research:</p>
                <label>{research.areaOfResearch}</label>
              </div>
              <div className="form-group">
                <p>Hypothesis:</p>
                <label>{research.hypothesis}</label>
              </div>
              <div className="form-group">
                <p>Objective:</p>
                <label>{research.objective}</label>
              </div>
            </div>
          )}
          {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Submit for Publication
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitResearch;
