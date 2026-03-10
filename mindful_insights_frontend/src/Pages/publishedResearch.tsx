import React, {useState} from "react";
import Wrapper from "../components/wrapper";
import PbrResults from "../components/pbr-results";


const PublishedResearh: React.FC = () => {

    const [showResults, setShowResults] = useState(false);
    const [topic, setTopic] = useState("");

    const handleFilterFind = (event: React.FormEvent) => {
        event.preventDefault();
        setShowResults(true);
    };
        return(
            <Wrapper>
                <div className="dashboard-container">
                <h2 className="pb-1"></h2>
                <div className="PB-container">
                    <div className="img-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/image2.png)` }}>
                        <div className="text-content">
                        <h1>Short Title</h1>
                        <p>Long Jacket</p>
                        <p className="img-description">EARTH 3D</p>
                        </div>
                    </div>
                    <div className="img-container" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/image3.png)` }}>
                        <div className="text-content">
                        <h1>Short Title</h1>
                        <p>Long Jacket</p>
                        <p className="img-description">EARTH 3D</p>
                        </div>
                    </div>
                    <div className="img-container">
                        <div className="text-content">
                        <h1>Short Title</h1>
                        <p>Long Jacket</p>
                        <p className="img-description">EARTH 3D</p>
                        </div>
                    </div>
                </div>

                <h1 className="pb-2 mt-5">Download a Report</h1>
                <div className="Collaboration-container">
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Research Paper Name</label>
                            <input type="text" className="form-control" placeholder="Enter key words" value={topic} onChange={(e) => setTopic(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Author</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputState" className="form-label">Field of study</label>
                            <select id="inputState" className="form-select">
                            <option selected>Choose...</option>
                            <option>...</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputAddress2" className="form-label">Date Published</label>
                            <input type="date" className="form-control" id="date" name="date"/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputState" className="form-label">Category</label>
                            <select id="inputState" className="form-select">
                            <option selected>Choose...</option>
                            <option>...</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="filter-find-button" onClick={handleFilterFind}>Find</button>
                        </div>
                    </form>
                    <img src={process.env.PUBLIC_URL + '/assets/images/PBR-illu.PNG'} alt="Image:)"/>
                </div>
                {showResults && <PbrResults topic={topic} />}
                </div>
            </Wrapper>
        );

    }
    
export default PublishedResearh;