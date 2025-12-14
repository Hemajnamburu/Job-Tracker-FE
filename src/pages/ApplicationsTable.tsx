import React from "react";
import { TableRow } from "./TableRow";
import { Link } from "react-router-dom";
import { JobFormDataFromGET } from "./ApplicationForm";

interface ApplicationsTableProps {
  data: JobFormDataFromGET[];
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Applications
          </h2>
          <Link
            to="/add-application"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            + Add Application
          </Link>
        </div>
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No applications yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Start tracking your job applications.</p>
          <Link
            to="/add-application"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Add Your First Application
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Applications
          </h2>
          <Link
            to="/add-application"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            + Add Application
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((app, idx) => (
                <TableRow
                  key={idx}
                  company={app.companyName}
                  companyColor={app.companyId?.avatarColor}
                  position={app.positionTitle}
                  currentStatus={app.currentStatus}
                  date={app.applicationDate}
                  application={app}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
