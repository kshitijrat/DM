// src/context/GeoContext.js
import React, { createContext, useState } from "react";

export const GeoContext = createContext({
  path: [],
  setPath: () => {},
});

export const GeoProvider = ({ children }) => {
  const [path, setPath] = useState([]);

  return (
    <GeoContext.Provider value={{ path, setPath }}>
      {children}
    </GeoContext.Provider>
  );
};
