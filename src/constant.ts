export const dummyApplications = [
  {
    id: 1,
    company: "Google",
    position: "Senior Frontend Developer",
    status: "Interview",
    date: "2024-12-15",
    color: "green",
    initial: "G",
    avatarColor: "bg-blue-600",
  },
  {
    id: 2,
    company: "Apple",
    position: "iOS Developer",
    status: "Pending",
    date: "2024-12-12",
    color: "yellow",
    initial: "A",
    avatarColor: "bg-black",
  },
  {
    id: 3,
    company: "Microsoft",
    position: "Software Engineer",
    status: "Rejected",
    date: "2024-12-10",
    color: "red",
    initial: "M",
    avatarColor: "bg-blue-400",
  },
  {
    id: 4,
    company: "Spotify",
    position: "Full Stack Developer",
    status: "Applied",
    date: "2024-12-08",
    color: "blue",
    initial: "S",
    avatarColor: "bg-purple-600",
  },
];

export const dummyCompanies = [
  {
    id: 1,
    name: "Google",
    category: "Technology",
    applications: 3,
    interviews: 1,
    lastApplied: "2024-12-15",
    initial: "G",
    avatarColor: "bg-blue-600",
  },
  {
    id: 2,
    name: "Apple",
    category: "Technology",
    applications: 2,
    interviews: 0,
    lastApplied: "2024-12-12",
    initial: "A",
    avatarColor: "bg-black",
  },
  {
    id: 3,
    name: "Microsoft",
    category: "Technology",
    applications: 1,
    interviews: 0,
    lastApplied: "2024-12-10",
    initial: "M",
    avatarColor: "bg-blue-400",
  },
];

export interface Interview {
  id: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  position: string;
  dateLabel: string; // "Today", "Tomorrow", or "Dec 25"
  type: string;
  time: string;
  duration: string;
  format: string;
  primaryAction?: string;
  secondaryAction?: string;
}


export const upcomingInterviews: Interview[] = [
  {
    id: "1",
    company: "Google",
    companyInitial: "G",
    companyColor: "bg-blue-600",
    position: "Senior Frontend Developer",
    dateLabel: "Today",
    type: "Technical",
    time: "2:00 PM",
    duration: "1 hour",
    format: "Video Call",
    primaryAction: "Join Meeting",
    secondaryAction: "View Details",
  },
  {
    id: "2",
    company: "Spotify",
    companyInitial: "S",
    companyColor: "bg-purple-600",
    position: "Full Stack Developer",
    dateLabel: "Tomorrow",
    type: "HR Round",
    time: "10:00 AM",
    duration: "45 mins",
    format: "Phone Call",
    primaryAction: "Reschedule",
    secondaryAction: "View Details",
  },
  {
    id: "3",
    company: "Netflix",
    companyInitial: "N",
    companyColor: "bg-red-600",
    position: "Backend Developer",
    dateLabel: "Dec 25",
    type: "Technical",
    time: "4:30 PM",
    duration: "1 hour",
    format: "Onsite",
    primaryAction: "View Details",
  },
];

