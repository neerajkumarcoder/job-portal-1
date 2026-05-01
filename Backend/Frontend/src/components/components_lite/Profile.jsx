
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 lg:p-8 shadow shadow-gray-400 hover:shadow-yellow-400 mx-4 sm:mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 text-center sm:text-left">
            <Avatar className="cursor-pointer h-20 w-20 sm:h-24 sm:w-24 shrink-0">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="@shadcn"
              />
            </Avatar>
            <div className="min-w-0">
              <h1 className="font-medium text-lg sm:text-xl break-words">
                {user?.fullname}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 break-words">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Button
              onClick={() => setOpen(true)}
              className="text-right"
              variant="outline"
            >
              <Pen />
            </Button>
          </div>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
            <Mail className="shrink-0" />
            <span className="min-w-0 break-all">
              <a
                href={`mailto:${user?.email}`}
                className="hover:underline"
              >
                {user?.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3 my-2 text-sm sm:text-base">
            <Contact className="shrink-0" />
            <span className="min-w-0 break-all">
              <a
                href={`tel:${user?.phoneNumber}`}
                className="hover:underline"
              >
                {user?.phoneNumber}
              </a>
            </span>
          </div>
        </div>

        <div>
          <div className="my-5">
            <h1 className="font-bold mb-2">Skills</h1>
            <div className="flex flex-wrap items-center gap-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge key={index}>{item}</Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label className="text-md font-bold"> Resume</label>
            <div>
              {isResume ? (
                <a
                  target="_blank"
                  href={user?.profile?.resume}
                  className="text-blue-600 hover:underline cursor-pointer break-all"
                >
                  Download {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>No Resume Found</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-6 lg:px-0 mb-10">
        <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

        {/* Add Application Table */}
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
