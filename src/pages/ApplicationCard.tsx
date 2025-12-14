import { StatusBadge } from "./StatusBadge";
import { ApplicationStatus, STATUS_MAP } from "./TableRow";
import React, { useState, useContext } from "react";
import { format } from "date-fns/format";
import { JobFormDataFromGET } from "./ApplicationForm";
import { toast } from "react-toastify";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobFormDataFromGET | undefined;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  isOpen,
  onClose,
  application,
}) => {
  const token = useContext(AuthContext)?.token;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await api.delete(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Application deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        onClose();
      } catch (error) {
        console.error("Failed to delete application", error);
        toast.error("Failed to delete application");
      }
    }
  };
  if (!isOpen || !application) return null;

  const status = STATUS_MAP[application.currentStatus];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
              style={{ backgroundColor: application.avatarColor || "#999" }}
            >
              {application.companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {application.positionTitle}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {application.companyName}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/edit-application/${application._id}`); }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(application._id); }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200 text-xl"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </span>
            <StatusBadge label={status.label} color={status.color} />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Department
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Location
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Job Type
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.jobType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Work Mode
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.workMode}</p>
            </div>
          </div>

          {/* Salary */}
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Salary Range
            </p>
            <p className="text-gray-900 dark:text-gray-100">
              ₹{application.salaryMin} - ₹{application.salaryMax}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Application Date
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {format(new Date(application.applicationDate), "dd MMM yyyy")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Follow-up Date
              </p>
              <p className="text-gray-900 dark:text-gray-100">
                {application.followUpDate ? format(new Date(application.followUpDate), "dd MMM yyyy") : "N/A"}
              </p>
            </div>
          </div>

          {/* Contacts */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Recruiter
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.recruiterName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{application.recruiterEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                HR Contact
              </p>
              <p className="text-gray-900 dark:text-gray-100">{application.hrContact}</p>
            </div>
          </div>

          {/* Links and Notes */}
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Job Posting URL
            </p>
            <a
              href={application.jobPostingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {application.jobPostingUrl}
            </a>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Application Source
            </p>
            <p className="text-gray-900 dark:text-gray-100">{application.applicationSource}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Cover Letter Submitted
            </p>
            <p className="text-gray-900 dark:text-gray-100">{application.coverLetterSubmitted}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Resume Version
            </p>
            <p className="text-gray-900 dark:text-gray-100">{application.resumeVersion}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Notes
            </p>
            <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{application.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ApplicationCardProps {
  company: string;
  position: string;
  currentStatus: ApplicationStatus;
  date: string;
  initial: string;
  avatarColor?: string;
  application?: JobFormDataFromGET;
}

export const ApplicationCard = ({
  company,
  position,
  currentStatus,
  date,
  initial,
  avatarColor,
  application,
}: ApplicationCardProps) => {
  const [open, setOpen] = useState(false);
  const status = STATUS_MAP[currentStatus];
  return (
    <>
      <div
        className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow hover:shadow-md dark:hover:shadow-[0_6px_8px_-2px_rgba(255,255,255,0.1)] cursor-pointer transition"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: avatarColor || "#999" }}
          >
            {initial}
          </div>
          <div>
            <div className="text-gray-900 dark:text-gray-100 font-semibold">
              {company}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {position}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge label={status.label} color={status.color} />
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <ApplicationDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        application={application}
      />
    </>
  );
};
