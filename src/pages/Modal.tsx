import React from "react";
import { Interview } from "./InterviewsComponent";
import { formatDate } from "../utils/dateUtils";

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export const InterviewDetailsModal: React.FC<InterviewModalProps> = ({
  isOpen,
  onClose,
  interview,
}) => {
  if (!isOpen || !interview) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-6 py-4 rounded-t-xl`}
          style={{
            background: `linear-gradient(90deg, ${interview.companyColor}, #6b21a8)`,
          }}
        >
          <div>
            <h2 className="text-lg font-semibold text-white">
              Interview Details
            </h2>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {interview.interviewType} - {interview.companyName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-gray-800 dark:text-white font-bold"
              style={{ backgroundColor: interview.companyColor }}
            >
              {interview.companyInitial}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {interview.companyName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {interview.positionTitle}
              </p>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 mt-1 inline-block">
                {formatDate(interview.interviewDate)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-300">
            <div>
              <p className="dark:text-gray-400">Date</p>
              <p className="font-medium">{formatDate(interview.interviewDate)}</p>
            </div>
            <div>
              <p className="dark:text-gray-400">Time</p>
              <p className="font-medium">{interview.time}</p>
            </div>
            <div>
              <p className="dark:text-gray-400">Duration</p>
              <p className="font-medium">{interview.duration}</p>
            </div>
            <div>
              <p className="dark:text-gray-400">Format</p>
              <p className="font-medium">{interview.format}</p>
            </div>
          </div>

          {/* <div className="flex gap-2 justify-end">
            {interview.secondaryAction && (
              <button
                className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                // onClick={() => alert(`Action: ${interview.secondaryAction}`)}
              >
                {interview.secondaryAction}
              </button>
            )}
            {interview.primaryAction && (
              <button
                className="px-3 py-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                // onClick={() => alert(`Action: ${interview.primaryAction}`)}
              >
                {interview.primaryAction}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};
