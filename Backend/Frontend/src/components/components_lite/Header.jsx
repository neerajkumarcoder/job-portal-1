
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 my-8 sm:my-10">
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium text-xs sm:text-sm md:text-base">
            <span className="text-[#614232]">
              {" "}
              <PiBuildingOfficeBold />
            </span>{" "}
            No.1 Job Hunt Website
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Search Apply & <br className="hidden sm:block" />
            Get Your <span className="text-[#6A38C2]">Dream Job</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-700 px-2 sm:px-0">
            Start your hunt for the best, life-changing career opportunities
            from here in your{" "}
            <br className="hidden md:block" />
            selected areas conveniently and get hired quickly.
          </p>
          <div className="flex w-full sm:w-[70%] md:w-[55%] lg:w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full text-sm sm:text-base bg-transparent py-2"
            />
            <Button
              onClick={searchjobHandler}
              className="rounded-r-full shrink-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
