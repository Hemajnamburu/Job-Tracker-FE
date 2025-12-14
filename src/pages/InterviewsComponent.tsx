import React, { useEffect, useState } from "react";
import { InterviewCard } from "./InterviewCard";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { InterviewFormat, InterviewType } from "./addInterviewDetals";

export interface Interview {
  _id: string;
  interviewType: InterviewType;
  interviewDate: string;
  time: string;
  duration: string;
  format: InterviewFormat;
  meetingLink: string;
  interviewerName: string;
  interviewerEmail: string;
  notes: string;
  companyName: string;
  positionTitle: string;
  companyInitial: string;
  companyColor: string;
};

export const UpcomingInterviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/interviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews(res.data);
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/interviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInterviews((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Upcoming Interviews
        </h2>
        <button
          className="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-medium"
          onClick={() => navigate("/add-interview")}
        >
          + Schedule
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading Interviews...</div>
      ) : interviews && interviews.length > 0 ? (
        interviews.map((interview) => (
          <InterviewCard
            key={interview._id}
            interview={interview}
            onEdit={() => navigate(`/edit-interview/${interview._id}`)}
            onDelete={() => handleDelete(interview._id)}
            onJoin={() => window.open(interview.meetingLink, "_blank")}
          />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No upcoming interviews</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Schedule your first interview to get started.</p>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
            onClick={() => navigate("/add-interview")}
          >
            + Schedule Interview
          </button>
        </div>
      )}
    </div>
  );
};
