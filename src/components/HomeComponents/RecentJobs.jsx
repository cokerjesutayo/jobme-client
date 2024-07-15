import React,{useState,useEffect} from "react";
import { jobs } from "../../data/jobs";
import JobCard from "../JobCard";
import axios from "axios";
import Loader from "../Loader";
const RecentJobs = () => {
  const[jobs,setJobs]=useState([])
  const [isLoading,setisLoading]=useState(true);

  const getRecentJobs=async ()=>{
    try {
      const { data } = await axios(
        "https://jobme-tayo.onrender.com/api/v1/jobs/latest"
      );
      setJobs(data.jobs);
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getRecentJobs()
  },[]);;

  if(isLoading){
    return <Loader height={"300px"} />;
  }
  return (
    <section>
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        {jobs.map((job) => {
          return <JobCard key={job._id} {...job} />;
        })}
      </div>
    </section>
  );
};

export default RecentJobs;
