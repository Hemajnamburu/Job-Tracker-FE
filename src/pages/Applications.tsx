import { dummyApplications } from "../constant";
import { StatusFilter } from "./StatusFilter";
import { SearchInput } from "./SearchInput";
import { ApplicationCard } from "./ApplicationCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { JobFormDataFromGET } from "./ApplicationForm";
import { useContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../context/authContext";

export const AllApplications = () => {
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const token = useContext(AuthContext)?.token

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["jobs", status, search],
    queryFn: async () => {
      const res = await api.get("/jobs", {
        params: {
          search,
          status,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto p-4">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          All Applications
        </h2>
        <Link
          to="/add-application"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
        >
          + Add
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex gap-4">
        <StatusFilter value={status} onChange={setStatus} />
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* List of applications */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading Applications...</div>
      ) : jobs && jobs.length > 0 ? (
        <div className="space-y-3">
          {jobs.map((app: JobFormDataFromGET) => (
            <ApplicationCard
              key={app._id}
              company={app.companyName}
              position={app.positionTitle}
              currentStatus={app.currentStatus}
              date={app.applicationDate}
              initial={app.companyName.charAt(0).toUpperCase()}
              avatarColor={app.avatarColor}
              application={app}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No applications yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Start tracking your job applications by adding your first one.</p>
          <Link
            to="/add-application"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Add Your First Application
          </Link>
        </div>
      )}
    </div>
  );
};
