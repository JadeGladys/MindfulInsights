import React, { ReactNode } from "react";
import Nav from "../nav";
import HodMenu from "./hod-menu";
import { useAuth } from "../../AuthContext";
interface WrapperProps {
  //accessToken: string;
  children: React.ReactNode;
}

const HodWrapper: React.FC<WrapperProps> = ({children }) => {
  const { username, accessToken, userID, id } = useAuth();
  return (
    <div className="wrapper">
      <Nav username={username || ''} accessToken={accessToken || ''} userID={userID || ''} id={id || ''} />
      <div className="container-fluid">
        <div className="row">
          <HodMenu/>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default HodWrapper;
