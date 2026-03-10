import React, { useState } from "react";
import Wrapper from "../components/wrapper";
import CollabResults from "../components/collab-results";

const Collaboration: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [topic, setTopic] = useState("");

  const handleFilterFind = (event: React.FormEvent) => {
    event.preventDefault();
    setShowResults(true);
  };

  return (
    <Wrapper>
      <div className="dashboard-container">
        <div className="Collaboration-container">
          <form className="row g-3" onSubmit={handleFilterFind}>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">Title/Topic</label>
              <input type="text" className="form-control" id="inputEmail4" placeholder="Enter key words"
                value={topic} onChange={(e) => setTopic(e.target.value)}/>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">Author</label>
              <input type="text" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">Field of study</label>
              <select id="inputState" className="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress2" className="form-label">Date started</label>
              <input type="date" className="form-control" id="date" name="date" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">Category</label>
              <select id="inputState" className="form-select">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div>
              <button type="submit" className="filter-find-button">Filter Find</button>
            </div>
          </form>
          <img src={process.env.PUBLIC_URL + '/assets/images/collab-illu.PNG'} alt="Image:)" />
        </div>
        {showResults && <CollabResults topic={topic} />}
      </div>
    </Wrapper>
  );
}

export default Collaboration;
