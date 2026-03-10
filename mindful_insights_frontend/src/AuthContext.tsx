import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  accessToken: string | null;
  username: string | null;
  userID: string | null;
  id: string | null;
  research_ID: string | null;
  setAccessToken: (token: string) => void;
  setUsername: (username: string) => void;
  setUserID: (userID: string) => void;
  setID: (id: string) => void;
  setResearchID: (researchID: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(localStorage.getItem('accessToken'));
  const [username, setUsernameState] = useState<string | null>(localStorage.getItem('username'));
  const [userID, setUserIDState] = useState<string | null>(localStorage.getItem('userID'));
  const [id, setIDState] = useState<string | null>(localStorage.getItem('id'));
  const [research_ID, setResearchID] = useState<string | null>(null);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessTokenState(token);
  };

  const setUsername = (username: string) => {
    localStorage.setItem('username', username);
    setUsernameState(username);
  };

  const setUserID = (userID: string) => {
    localStorage.setItem('userID', userID);
    setUserIDState(userID);
  };

  const setID = (id: string) => {
    localStorage.setItem('id', id);
    setIDState(id);
  };

  const setResearch_ID = (researchID: string) => {
    localStorage.setItem('research_ID', researchID);
    setResearch_ID(researchID);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUsername = localStorage.getItem('username');
    const storedUserID = localStorage.getItem('userID');
    const storedID = localStorage.getItem('id');

    if (storedToken) {
      setAccessTokenState(storedToken);
    }

    if (storedUsername) {
      setUsernameState(storedUsername);
    }

    if (storedUserID) {
      setUserIDState(storedUserID);
    }

    if (storedID) {
      setIDState(storedID);
    }
  }, []);

  const value = {
    accessToken,
    username,
    userID,
    id,
    research_ID,
    setAccessToken,
    setUsername,
    setUserID,
    setID,
    setResearchID,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
