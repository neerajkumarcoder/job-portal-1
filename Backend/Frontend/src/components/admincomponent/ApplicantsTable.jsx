
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>A list of your recent applied user</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants &&
              applicants?.applications?.map((item) => (
                <tr key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer"
                        href={item?.applicant?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                        {/* {item?.applicant?.profile?.resume} */}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.applicant?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => {
                          return (
                            <div
                              onClick={() => statusHandler(status, item?._id)}
                              key={index}
                              className="flex w-fit items-center my-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="shortlistingStatus"
                                value={status}
                              />{" "}
                              {status}
                            </div>
                          );
                        })}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          A list of your recent applied user
        </p>
        {!applicants?.applications?.length ? (
          <span className="block text-center text-gray-500 py-4">
            No applicants yet.
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {applicants?.applications?.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base break-words">
                      {item?.applicant?.fullname}
                    </h3>
                    <p className="text-sm text-gray-700 break-all">
                      <span className="font-medium">Email: </span>
                      {item?.applicant?.email}
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger className="cursor-pointer shrink-0 p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32" align="end">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="shortlistingStatus"
                              value={status}
                            />{" "}
                            {status}
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-sm text-gray-700 break-all">
                  <span className="font-medium">Contact: </span>
                  {item?.applicant?.phoneNumber}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Resume: </span>
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 cursor-pointer break-all"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">Date: </span>
                  {item?.applicant?.createdAt.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsTable;
