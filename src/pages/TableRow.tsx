import React, { useState, useContext, useEffect, useRef } from "react";
import { StatusBadge } from "./StatusBadge";
import { format } from "date-fns";
import { JobFormDataFromGET } from "./ApplicationForm";
import { toast } from "react-toastify";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ApplicationDetailsModal } from "./ApplicationCard";

export const STATUS_MAP: Record<
  "Applied" | "Pending" | "Interview Scheduled" | "Rejected" | "Offer Received",
  { label: string; color: "blue" | "yellow" | "purple" | "red" | "green" }
> = {
  Applied: {
    label: "Applied",
    color: "blue",
  },
  Pending: {
    label: "Pending",
    color: "yellow",
  },
  "Interview Scheduled": {
    label: "Interview Scheduled",
    color: "purple",
  },
  Rejected: {
    label: "Rejected",
    color: "red",
  },
  "Offer Received": {
    label: "Offer Received",
    color: "green",
  },
};

export enum ApplicationStatus {
  Applied = "Applied",
  InterviewScheduled = "Interview Scheduled",
  Rejected = "Rejected",
  OfferReceived = "Offer Received",
  Pending = "Pending",
}

interface TableRowProps {
  company: string;
  companyColor?: string;
  position: string;
  currentStatus: ApplicationStatus;
  date: string;
  application: JobFormDataFromGET;
}


export const TableRow: React.FC<TableRowProps> = ({
  company,
  companyColor,
  position,
  currentStatus,
  date,
  application,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const token = useContext(AuthContext)?.token;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const status = STATUS_MAP[currentStatus];
  const formattedDate = format(new Date(date), "dd MMM yyyy");

  const handleView = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleEdit = () => {
    navigate(`/edit-application/${application._id}`);
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await api.delete(`/jobs/${application._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Application deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
      } catch (error) {
        toast.error("Failed to delete application");
      }
    }
    setIsDropdownOpen(false);
  };

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700">
        {/* Company cell */}
        <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
          {/* Avatar circle */}
          <span
            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: companyColor || "#999" }}
          >
            {company.charAt(0).toUpperCase()}
          </span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {company}
          </span>
        </td>
        {/* Position */}
        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {position}
        </td>
        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <StatusBadge label={status.label} color={status.color} />
        </td>
        {/* Date */}
        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
          {formattedDate}
        </td>
        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 text-right relative">
          <button
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            •••
          </button>
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleView}
              >
                View Details
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
      {isModalOpen && (
        <ApplicationDetailsModal
          isOpen={isModalOpen}
          application={application}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
