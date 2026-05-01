
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); // Trigger data fetch
  const jobs = useSelector((state) => state.jobs.allJobs); // Access Redux state
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">
        <Header />
        <Categories />
        {loading && (
          <p className="text-center text-sm sm:text-base text-gray-600 my-6 px-4">
            Loading jobs...
          </p>
        )}
        {error && (
          <p className="text-center text-sm sm:text-base text-red-600 my-6 px-4 break-words">
            Error: {error}
          </p>
        )}
        {!loading && !error && <LatestJobs jobs={jobs} />}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
