
import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Your recent Posted Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No Job Added
                </TableCell>
              </TableRow>
            ) : (
              filterJobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${job._id}`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <hr />
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                        >
                          <Eye className="w-4"></Eye>
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
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
          Your recent Posted Jobs
        </p>
        {filterJobs.length === 0 ? (
          <span className="block text-center text-gray-500 py-4">
            No Job Added
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {filterJobs?.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base break-words">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-700 break-words">
                      <span className="font-medium">Company: </span>
                      {job?.company?.name}
                    </p>
                  </div>
                  <Popover>
                    <PopoverTrigger className="cursor-pointer shrink-0 p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32" align="end">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4"></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">Date: </span>
                  {job.createdAt.split("T")[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobsTable;
