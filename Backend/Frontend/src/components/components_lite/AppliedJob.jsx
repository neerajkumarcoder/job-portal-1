
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
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusClass = (status) =>
    status === "rejected"
      ? "bg-red-500"
      : status === "accepted"
      ? "bg-green-600"
      : "bg-gray-500";

  return (
    <div>
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Recent Applied Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  You have not applied any job yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={getStatusClass(appliedJob?.status)}>
                      {" "}
                      {appliedJob?.status}
                    </Badge>{" "}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Recent Applied Jobs
        </p>
        {allAppliedJobs.length <= 0 ? (
          <span className="block text-center text-gray-500 py-4">
            You have not applied any job yet.
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {allAppliedJobs.map((appliedJob) => (
              <div
                key={appliedJob._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-base">
                    {appliedJob.job?.title}
                  </h3>
                  <Badge className={getStatusClass(appliedJob?.status)}>
                    {appliedJob?.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Company: </span>
                  {appliedJob.job?.company.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-medium">Date: </span>
                  {appliedJob?.createdAt.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJob;