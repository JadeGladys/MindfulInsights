import React, { ReactNode } from "react";
import Nav from "../nav";
import AnalystMenu from "./menu";
import { useAuth } from "../../AuthContext";
interface WrapperProps {
  //accessToken: string;
  children: React.ReactNode;
}

const AnalystWrapper: React.FC<WrapperProps> = ({children }) => {
  const { username, accessToken, userID, id } = useAuth();
  return (
    <div className="wrapper">
      <Nav username={username || ''} accessToken={accessToken || ''} userID={userID || ''} id={id || ''} />
      <div className="container-fluid">
        <div className="row">
          <AnalystMenu/>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnalystWrapper;
