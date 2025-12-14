import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { ApplicationsTable } from "./ApplicationsTable";
import { OverviewCards } from "./OverviewCards";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { ApplicationStatus } from "./TableRow";

export const Content = () => {
  const auth = useContext(AuthContext);
  const token = auth?.token;
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token,
  });

  if (isLoading) return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading Dashboard...</div>;

  const totalApplications = jobs.length;
  const pendingCount = jobs.filter(
    (j: any) => j.currentStatus === ApplicationStatus.Pending
  ).length;
  const interviewCount = jobs.filter(
    (j: any) => j.currentStatus === ApplicationStatus.InterviewScheduled
  ).length;
  const offerCount = jobs.filter(
    (j: any) => j.currentStatus === ApplicationStatus.OfferReceived
  ).length;
  return (
    <div className="flex flex-col gap-4 p-2 w-full max-w-[1100px] mx-auto">
      <div className="flex flex-row justify-evenly gap-2">
        <OverviewCards
          title="Total Applications"
          value={totalApplications}
          icon={<span className="text-2xl">📄</span>}
        />
        <OverviewCards 
          title="Pending" 
          value={pendingCount} 
          icon={<span className="text-2xl">⏳</span>} 
        />
        <OverviewCards
          title="Interviews"
          value={interviewCount}
          icon={<span className="text-2xl">📅</span>}
        />
        <OverviewCards 
          title="Offers" 
          value={offerCount} 
          icon={<span className="text-2xl">🏆</span>} 
        />
      </div>
      <div className="h-full">
        <ApplicationsTable data={jobs} />
      </div>
    </div>
  );
};
