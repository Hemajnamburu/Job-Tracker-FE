import { format } from "date-fns/format";
import { CompanySummary } from "./Companies";
import React, { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";
import { JobFormDataFromGET } from "./ApplicationForm";
import { ApplicationCard } from "./ApplicationCard";

interface CompanyApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  companyName: string;
}

const CompanyApplicationsModal: React.FC<CompanyApplicationsModalProps> = ({
  isOpen,
  onClose,
  companyId,
  companyName,
}) => {
  const [applications, setApplications] = useState<JobFormDataFromGET[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useContext(AuthContext)?.token;

  useEffect(() => {
    if (isOpen && companyId) {
      const fetchApplications = async () => {
        setLoading(true);
        try {
          const res = await api.get(`/companies/${companyId}/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setApplications(res.data);
        } catch (error) {
          console.error("Failed to fetch applications", error);
        } finally {
          setLoading(false);
        }
      };
      fetchApplications();
    }
  }, [isOpen, companyId, token]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Applications for {companyName}
          </h2>
          <button
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading applications...</p>
          ) : applications.length === 0 ? (
            <p className="text-center text-gray-500">No applications found.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <ApplicationCard
                  key={app._id}
                  company={app.companyName}
                  position={app.positionTitle}
                  currentStatus={app.currentStatus}
                  date={app.applicationDate}
                  initial={app.companyName[0]}
                  avatarColor={app.avatarColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CompanyCard = ({
  _id,
  name,
  applications,
  interviews,
  lastApplied,
  initial,
  avatarColor,
}: CompanySummary) => {
  const [open, setOpen] = useState(false);
  const token = useContext(AuthContext)?.token;
  const formattedDate = format(new Date(lastApplied), "dd MMM yyyy");
  return (
    <>
      <div
        className="flex items-center justify-between gap-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md dark:hover:shadow-[0_6px_8px_-2px_rgba(255,255,255,0.1)] transition cursor-pointer"
        onClick={() => setOpen(true)}
      >
        {/* Left: Avatar + Company Info */}
        <div className="flex items-center gap-4">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ backgroundColor: avatarColor || "#999" }}
          >
            {initial}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h3>
          </div>
        </div>

        {/* Right: Inline Stats */}
        <div className="flex flex-wrap gap-x-6 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Applications:
            </span>
            {applications}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Interviews:
            </span>
            {interviews}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Last Applied:
            </span>
            {formattedDate}
          </div>
        </div>
      </div>

      <CompanyApplicationsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        companyId={_id}
        companyName={name}
      />
    </>
  );
};
