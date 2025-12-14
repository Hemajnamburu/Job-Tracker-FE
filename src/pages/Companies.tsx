import { useContext, useState } from "react";
import { dummyCompanies } from "../constant";
import { CompanyCard } from "./CompanyCard";
import { SearchInput } from "./SearchInput";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { format } from "date-fns";

export interface CompanySummary {
  _id: string;
  name: string;
  avatarColor: string;
  applications: number;
  interviews: number;
  lastApplied: string;
  initial: string;
}

export const Companies = () => {
  const [search, setSearch] = useState<string>("");
  const token = useContext(AuthContext)?.token;
  const {
    data: companies = [],
    isLoading,
    error,
  } = useQuery<CompanySummary[]>({
    queryKey: ["companies-summary", search],
   queryFn: async () => {
      const res = await api.get("/companies/summary", {
        params: {
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });
  return (
    <div className="space-y-6 max-w-[1100px] p-4 mx-auto">
      {/* Header + search */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Companies
        </h2>
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* Company cards list */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading Companies...</div>
      ) : companies && companies.length > 0 ? (
        <div className="space-y-3">
          {companies.map((company) => (
            <CompanyCard key={company._id} {...company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No companies yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Companies will appear here as you add job applications.</p>
        </div>
      )}
    </div>
  );
};
