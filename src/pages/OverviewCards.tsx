import React, { JSX } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
}

export const OverviewCards: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="flex items-center justify-between p-4 h-20 w-52 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <div className="flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};
