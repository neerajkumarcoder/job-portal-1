
import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-md p-3 sm:p-4">
      {/* Header (with toggle on mobile) */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 rounded hover:bg-gray-100"
          aria-label="Toggle filters"
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>
      <hr className="mt-3" />

      {/* Filter content - hidden on mobile when closed, always visible on md+ */}
      <div className={`${isOpen ? "block" : "hidden"} md:block`}>
        <RadioGroup value={selectedValue} onValueChange={handleChange}>
          {filterData.map((data, index) => (
            <div key={index} className="mt-3">
              <h2 className="font-bold text-base sm:text-lg">
                {data.filterType}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 gap-x-2">
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-2 my-2"
                    >
                      <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
                      <label
                        htmlFor={itemId}
                        className="text-sm sm:text-base cursor-pointer break-words"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Filter;
