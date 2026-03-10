import React, { useEffect, useState } from "react";
import Wrapper from "../components/wrapper";
import Todolist from "../components/todolist";
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link } from "react-router-dom";

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

const Tasks: React.FC = () => {
  const { accessToken, userID } = useAuth();
  const [researches, setResearches] = useState<Research[]>([]);

  useEffect(() => {
    const fetchResearches = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/research/user/${userID}`, {
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
        <h1>TASKS</h1>
        <div className="table">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project</th>
                <th scope="col">Submitted</th>
                <th scope="col">Status</th>
                <th scope="col">Recorded by</th>
                <th scope="col">Assigned to</th>
              </tr>
            </thead>
            <tbody>
              {researches.map((research) => (
                <tr key={research.research_ID}>
                  <td>{research.research_ID}</td>
                  <td>{research.topic}</td>
                  <td>{new Date(research.startDate).toLocaleDateString()}</td>
                  <td>{research.status}</td>
                  <td>{research.recordedBy.userID}</td>
                  <td><Link to="/message">{research.analyst ? research.analyst.username : 'Not Assigned'}</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h1task">
          <h1>METRICS</h1>
          <Todolist />
        </div>
      </div>
    </Wrapper>
  );
};

export default Tasks;




            // <tbody>
            //   <tr>
            //     <td>3</td>
            //     <td>OCD</td>
            //     <td>2024-01-10</td>
            //     <td>Accepted</td>
            //     <td><Link to="/message">drkst-mttr</Link></td>
            //   </tr>
            // </tbody>