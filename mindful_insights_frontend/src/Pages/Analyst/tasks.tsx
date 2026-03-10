import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import AnalystWrapper from "../../components/analysts-component/wrapper";
import ATodolist from "./todolist";

interface Research {
  research_ID: number;
  topic: string;
  objective: string;
  startDate: string;
  endDate: string;
  description: string;
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
  analyst: {
    id: number;
    userID: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  }; 
}

const ATasks: React.FC = () => {
  const { accessToken, userID } = useAuth();
  const [researches, setResearches] = useState<Research[]>([]);

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/assigned/${userID}`, {
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
    <AnalystWrapper>
      <div className="dashboard-container">
        <h1>TASKS</h1>
        <div className="table">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project</th>
                <th scope="col">Submitted</th>
                <th scope="col">Created by</th>
                <th scope="col">Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {researches.map((research) => (
                <tr key={research.research_ID}>
                  <td>{research.research_ID}</td>
                  <td>{research.topic}</td>
                  <td>{new Date(research.startDate).toLocaleDateString()}</td>
                  <td>{research.recordedBy.userID}</td>
                  <td><Link to={`/AResearchReview/${research.research_ID}`}>Me</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h1task">
          <h1>METRICS</h1>
          <ATodolist />
        </div>
      </div>
    </AnalystWrapper>
  );
};

export default ATasks;
