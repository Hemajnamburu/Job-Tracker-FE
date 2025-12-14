import React from "react";

interface StatusBadgeProps {
  label: string;
  color: "green" | "yellow" | "red" | "blue" | "purple";
}

const colorMap = {
  green: {
    light: "bg-green-100 text-green-800",
    dark: "bg-green-900 text-green-200",
  },
  yellow: {
    light: "bg-yellow-100 text-yellow-800",
    dark: "bg-yellow-900 text-yellow-200",
  },
  red: {
    light: "bg-red-100 text-red-800",
    dark: "bg-red-900 text-red-200",
  },
  blue: {
    light: "bg-blue-100 text-blue-800",
    dark: "bg-blue-900 text-blue-200",
  },
  purple: {
    light: "bg-purple-100 text-purple-800",
    dark: "bg-purple-900 text-purple-200",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  color,
}) => {
  const classes = colorMap[color];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${classes.light} dark:${classes.dark}`}
    >
      {label}
    </span>
  );
};
