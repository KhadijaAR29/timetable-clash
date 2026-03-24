import React, { createContext, useState } from "react";

export const ClashContext = createContext();

export const ClashProvider = ({ children }) => {
  const [clashes, setClashes] = useState([]);

  return (
    <ClashContext.Provider value={{ clashes, setClashes }}>
      {children}
    </ClashContext.Provider>
  );
};