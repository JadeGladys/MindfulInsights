import '../css/CreateResearch.css';
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { Navigate } from 'react-router-dom';


interface CreateFormModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateFormModal: React.FC<CreateFormModalProps> = ({ show, handleClose }) => {
  const [topic, setTopic] = useState("");
  const [objective, setObjective] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [abstract, setAbstract] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [research_ID, setResearchID] = useState<string | null>(null);
  const { userID, id, accessToken } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newResearchRecord = {
      topic,
      objective,
      startDate,
      endDate,
      abstract,
      userID,
      id,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/research/create", newResearchRecord, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Research created successfully:", response.data);
      setSuccessMessage(`"${topic}" successfully created`);

      setResearchID(response.data.research_ID);

      setTimeout(() => {
        setSuccessMessage("");
        handleClose();
      }, 2000);

    } catch (error) {
      console.error("Error creating research:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      {research_ID && <Navigate to={`/workspace/ResearchProject/${research_ID}`} />}
      {show && (
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">Create New Entry</h2>
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="formTitle">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="formTitle"
                  placeholder="Enter title"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="formDescription">Abstract Description</label>
                <textarea
                  className="form-control"
                  id="formDescription"
                  rows={3}
                  placeholder="Enter abstract description"
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="formStartDate">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="formStartDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="formEndDate">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="formEndDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="formObjective">Objective</label>
                <input
                  type="text"
                  className="form-control"
                  id="formObjective"
                  placeholder="Enter objective"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFormModal;
