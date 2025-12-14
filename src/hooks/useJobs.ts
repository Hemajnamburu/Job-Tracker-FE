import { useQuery } from "@tanstack/react-query";
import { JobFormDataFromGET } from "../pages/ApplicationForm";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useJobs = () => {
  const token = useContext(AuthContext)?.token;
  return useQuery<JobFormDataFromGET[]>({
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
};
