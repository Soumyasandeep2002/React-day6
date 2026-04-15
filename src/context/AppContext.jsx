import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedVpa, setSelectedVpa] = useState(null);

  const [reportData, setReportData] = useState({
    count: 0,
    amount: 0,
  });

  const [reportList, setReportList] = useState([]);

  return (
    <AppContext.Provider
      value={{
        selectedVpa,
        setSelectedVpa,
        reportData,
        setReportData,
        reportList,        
        setReportList,     
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);