import React from "react";
import { useAuth } from "../AuthContext";
import Nav from "./nav";
import Menu from "./menu";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { username, accessToken, userID, id } = useAuth();

  return (
    <div className="wrapper">
      <Nav username={username || ''} accessToken={accessToken || ''} userID={userID || ''} id={id || ''} />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
