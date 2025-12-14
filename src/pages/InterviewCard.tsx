import React, { useState } from "react";
import { InterviewDetailsModal } from "./Modal";
import { Interview } from "./InterviewsComponent";
import { formatDate } from "../utils/dateUtils";

interface InterviewCardProps {
  interview: Interview;
  onEdit?: () => void;
  onDelete?: () => void;
  onJoin?: () => void;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onEdit, onDelete, onJoin }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`
          flex flex-col border rounded-xl p-4 
          bg-white dark:bg-gray-800 
          border-gray-200 dark:border-gray-700
          transition
          hover:shadow-md dark:hover:shadow-[0_6px_8px_-2px_rgba(255,255,255,0.1)]
          cursor-pointer
        `}
        onClick={() => setOpen(true)}
      >
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold`}
              style={{backgroundColor: interview.companyColor}}
            >
              {interview.companyInitial}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {interview.companyName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {interview.positionTitle}
              </p>
            </div>
          </div>

          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {formatDate(interview.interviewDate)}
          </span>
        </div>

        {/* Details */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Type:
            </span>{" "}
            {interview.interviewType}
          </div>
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Time:
            </span>{" "}
            {interview.time}
          </div>
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Duration:
            </span>{" "}
            {interview.duration}
          </div>
          <div>
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Format:
            </span>{" "}
            {interview.format}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {onJoin && (
            <button 
              className={`px-3 py-2 rounded text-white text-sm font-medium ${
                interview.meetingLink
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => { e.stopPropagation(); onJoin(); }}
              disabled={!interview.meetingLink}
            >
              Join
            </button>
          )}
          {onEdit && (
            <button
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="px-3 py-2 rounded border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 text-sm hover:bg-red-100 dark:hover:bg-red-700"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <InterviewDetailsModal
        isOpen={open}
        onClose={() => setOpen(false)}
        interview={interview}
      />
    </>
  );
};
