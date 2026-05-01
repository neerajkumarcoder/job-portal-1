import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios"; // Import axios
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res && res.data && res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        console.error("Error logging out:", res.data);
      }
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      toast.error("Error logging out. Please try again.");
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-blue-50 shadow-xl sticky top-0 z-50  ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-0">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-[#6B3AC2]"> Job </span>{" "}
            <span className="text-[#FA4F09]">Portal</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:text-cyan-700">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-cyan-700">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-cyan-700">
                  {" "}
                  <Link to={"/Home"}>Home</Link>
                </li>
                <li className="hover:text-cyan-700">
                  {" "}
                  <Link to={"/Browse"}>Browse</Link>{" "}
                </li>
                <li className="hover:text-cyan-700">
                  {" "}
                  <Link to={"/Jobs"}>Jobs</Link>
                </li>
                {/* <li>
                  {" "}
                  <Link to={"/Creator"}>About</Link>
                </li> */}
              </>
            )}
          </ul>
          {!user ? (
            <div className=" flex items-center gap-2">
              <Link to={"/login"}>
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/register"}>
                {" "}
                <Button className="bg-red-600  hover:bg-red-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600  ">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link">
                        {" "}
                        <Link to={"/Profile"}> Profile</Link>{" "}
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-blue-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-50 border-t border-blue-100 shadow-md">
          <div className="px-4 py-4 flex flex-col gap-4">
            <ul className="flex flex-col font-medium gap-3">
              {user && user.role === "Recruiter" ? (
                <>
                  <li className="hover:text-cyan-700">
                    <Link to={"/admin/companies"} onClick={closeMobileMenu}>
                      Companies
                    </Link>
                  </li>
                  <li className="hover:text-cyan-700">
                    <Link to={"/admin/jobs"} onClick={closeMobileMenu}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-cyan-700">
                    <Link to={"/Home"} onClick={closeMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className="hover:text-cyan-700">
                    <Link to={"/Browse"} onClick={closeMobileMenu}>
                      Browse
                    </Link>
                  </li>
                  <li className="hover:text-cyan-700">
                    <Link to={"/Jobs"} onClick={closeMobileMenu}>
                      Jobs
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to={"/login"} onClick={closeMobileMenu} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to={"/register"} onClick={closeMobileMenu} className="flex-1">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="border-t border-blue-100 pt-4">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user?.fullname}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "Student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2></User2>
                      <Button variant="link" onClick={closeMobileMenu}>
                        <Link to={"/Profile"}>Profile</Link>
                      </Button>
                    </div>
                  )}

                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut></LogOut>
                    <Button
                      onClick={() => {
                        logoutHandler();
                        closeMobileMenu();
                      }}
                      variant="link"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
