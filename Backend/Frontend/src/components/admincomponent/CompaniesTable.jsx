
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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Your recent registered Companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No Companies Added
                </TableCell>
              </TableRow>
            ) : (
              filterCompany?.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={company.logo || "default-logo-url"}
                        alt={`${company.name} logo`}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
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
          Your recent registered Companies
        </p>
        {filterCompany.length === 0 ? (
          <span className="block text-center text-gray-500 py-4">
            No Companies Added
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {filterCompany?.map((company) => (
              <div
                key={company.id}
                className="border rounded-lg p-4 shadow-sm bg-white flex items-center gap-3"
              >
                <Avatar className="shrink-0">
                  <AvatarImage
                    src={company.logo || "default-logo-url"}
                    alt={`${company.name} logo`}
                  />
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base break-words">
                    {company.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-medium">Date: </span>
                    {company.createdAt.split("T")[0]}
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger className="cursor-pointer shrink-0 p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32" align="end">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesTable;
