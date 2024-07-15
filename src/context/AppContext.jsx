import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

const AppContext = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("");
  const [totalJobs, setTotalJobs] = useState("");
  const [jobType, setJobType] = useState("");
  const [mode, setMode] = useState("");
  const [industry, setIndustry] = useState("");
  const [selectLocations,setSelectLocations]= useState("")
  const resetFilters = () => {
    setJobType("");
    setMode("")
    setIndustry("")
    setSelectLocations("")
  };

  const updateJobType = (value) => {
    setJobType(value);
    setPage(1)
  };

    const updateMode = (value) => {
      setMode(value);
        setPage(1);
    };

        const updateIndustry = (value) => {
          setIndustry(value);
            setPage(1);
        };

        const updateLocations = (value) => {
          setSelectLocations(value);
            setPage(1);
        };


  const url = "https://jobme-tayo.onrender.com/api/v1/jobs";
  const getJobs = async () => {
    setIsLoading(true);
    const { data } = await axios(`${url}?page=${page}&jobType=${jobType}&mode=${mode}&industry=${industry}&location=${selectLocations}`);
    setIsLoading(false);
    setJobs(data.jobs);
    setTotalPages(data.totalPages);
    setTotalJobs(data.totalJobs);
  };

  useEffect(() => {
    getJobs();
  }, [page, jobType,mode,industry,selectLocations]);
  return (
    <GlobalContext.Provider
      value={{
        jobs,
        isLoading,
        totalPages,
        page,
        setPage,
        totalJobs,
        updateJobType,
        updateMode,
        updateIndustry,
        updateLocations,
        resetFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
