
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-bold text-lg sm:text-xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap gap-2 items-center mt-4">
              <Badge className="text-blue-600 font-bold" variant="ghost">
                {singleJob?.position} Open Positions
              </Badge>
              <Badge className="text-[#FA4F09] font-bold" variant="ghost">
                {singleJob?.salary}LPA
              </Badge>
              <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
                {singleJob?.location}
              </Badge>
              <Badge className="text-black font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg w-full md:w-auto ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#6B3AC2] hover:bg-[#552d9b]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4 text-sm sm:text-base">
          {singleJob?.description}
        </h1>
        <div className="my-4 space-y-1">
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Role:{" "}
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.position} Open Positions
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Location:{" "}
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Salary:{" "}
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Experience:{" "}
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Total Applicants:{" "}
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Job Type:
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1 text-sm sm:text-base">
            Post Date:
            <span className="pl-2 sm:pl-4 font-normal text-gray-800 break-words">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Description;
