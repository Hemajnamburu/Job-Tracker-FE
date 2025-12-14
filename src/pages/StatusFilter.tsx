type StatusFilterProps = {
  value: string;
  onChange: (status: string) => void;
};

export const StatusFilter = ({ value, onChange }: StatusFilterProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
    >
      <option value="">All Status</option>
      <option value="Applied">Applied</option>
      <option value="Interview Scheduled">Interview Scheduled</option>
      <option value="Pending">Pending</option>
      <option value="Rejected">Rejected</option>
      <option value="Offer Received">Offer Received</option>
    </select>
  );
};
