import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import AsyncSelect from "react-select/async";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { ApplicationStatus } from "./TableRow";

interface CompanyOption {
  value: string;
  label: string;
  __isNew__?: boolean;
}

export interface CompanyPopulated {
  _id: string;
  name: string;
  avatarColor: string;
}

export interface JobFormDataFromGET {
  _id: string;
  companyId: CompanyPopulated | null;
  companyName: string;
  positionTitle: string;
  department: string;
  location: string;
  avatarColor: string;
  currentStatus: ApplicationStatus;
  applicationDate: string;
  priorityLevel: "Low" | "Medium" | "High";
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workMode: "Remote" | "On-site" | "Hybrid";
  salaryMin: string;
  salaryMax: string;
  jobPostingUrl: string;
  recruiterName: string;
  recruiterEmail: string;
  hrContact: string;
  applicationSource: string;
  coverLetterSubmitted: "Yes" | "No";
  resumeVersion: string;
  notes: string;
  followUpDate: string;
}

export interface JobFormDataPost {
  // Basic Information
  companyName: string;
  positionTitle: string;
  department: string;
  location: string;
  avatarColor: string;

  // Application Status
  currentStatus: ApplicationStatus;
  applicationDate: string;
  priorityLevel: "Low" | "Medium" | "High";

  // Job Details
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Temporary";
  workMode: "On-site" | "Remote" | "Hybrid";
  salaryMin: string;
  salaryMax: string;
  jobPostingUrl: string;

  // Contact Information
  recruiterName: string;
  recruiterEmail: string;
  hrContact: string;
  applicationSource: string;

  // Additional Information
  coverLetterSubmitted: "Yes" | "No";
  resumeVersion: string;
  notes: string;
  followUpDate: string;

  // Company reference
  companyId: string | null;
}

export const defaultJobFormData: JobFormDataPost = {
  companyName: "",
  positionTitle: "",
  department: "",
  location: "",
  avatarColor: "",
  currentStatus: ApplicationStatus.Applied,
  applicationDate: "",
  priorityLevel: "Medium",
  jobType: "Full-time",
  workMode: "Remote",
  salaryMin: "",
  salaryMax: "",
  jobPostingUrl: "",
  recruiterName: "",
  recruiterEmail: "",
  hrContact: "",
  applicationSource: "Company Website",
  coverLetterSubmitted: "No",
  resumeVersion: "",
  notes: "",
  followUpDate: "",
  companyId: null,
};

const getRandomColor = () => {
  const colors = [
    "#3b82f6",
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "var(--tw-bg-light)",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--tw-text-light)",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "var(--tw-text-light)",
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--tw-bg-light)",
    color: "var(--tw-text-light)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#3b82f6" : "transparent",
    color: state.isFocused ? "#ffffff" : "var(--tw-text-light)",
    cursor: "pointer",
  }),
};

export const ApplicationForm = () => {
  const [formData, setFormData] = useState<JobFormDataPost>(defaultJobFormData);
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<CompanyOption | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const auth = useContext(AuthContext);
  const token = auth?.token;

  useEffect(() => {
    if (id) {
      // Fetch application data for editing
      const fetchApplication = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await api.get(`/jobs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const app = res.data;
          setFormData({
            companyName: app.companyName,
            positionTitle: app.positionTitle,
            department: app.department,
            location: app.location,
            avatarColor: app.avatarColor,
            currentStatus: app.currentStatus,
            applicationDate: app.applicationDate.split('T')[0], // Format date
            priorityLevel: app.priorityLevel,
            jobType: app.jobType,
            workMode: app.workMode,
            salaryMin: app.salaryMin,
            salaryMax: app.salaryMax,
            jobPostingUrl: app.jobPostingUrl,
            recruiterName: app.recruiterName,
            recruiterEmail: app.recruiterEmail,
            hrContact: app.hrContact,
            applicationSource: app.applicationSource,
            coverLetterSubmitted: app.coverLetterSubmitted,
            resumeVersion: app.resumeVersion,
            notes: app.notes,
            followUpDate: app.followUpDate ? app.followUpDate.split('T')[0] : '',
            companyId: app.companyId?._id || app.companyId,
          });
          if (app.companyName) {
            setSelectedCompany({
              value: app.companyId || "",
              label: app.companyName,
            });
            setInputValue(app.companyName);
          }
        } catch (error) {
          console.error("Failed to fetch application", error);
        }
      };
      fetchApplication();
    }
  }, [id, token]);

  const handleCompanySearch = async (inputValue: string) => {
    if (!inputValue) return [];

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/companies?search=${inputValue}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mapped = res.data.map((c: any) => ({
        value: c._id,
        label: c.name,
      }));

      return mapped;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const handleCompanyChange = (option: CompanyOption | null) => {
    if (!option) {
      setSelectedCompany(null);
      setFormData((prev) => ({
        ...prev,
        companyName: "",
        companyId: null,
      }));
      return;
    }

    setSelectedCompany(option);
    setFormData((prev) => ({
      ...prev,
      companyName: option.label,
      companyId: option.value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      coverLetterSubmitted: ["Yes", "No"].includes(e.target.value)
        ? (e.target.value as "Yes" | "No")
        : prev.coverLetterSubmitted,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        companyId: selectedCompany?.value,
      };

      const token = localStorage.getItem("token");

      if (id) {
        await api.put(`/jobs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Job updated successfully!");
      } else {
        await api.post("/jobs", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Job created successfully!");
        setFormData(defaultJobFormData);
        setSelectedCompany(null);
      }

      // Navigate to applications
      navigate("/applications");
    } catch (error: any) {
      console.error("Failed to save job:", error.response?.data || error);
      toast.error(
        "Failed to save job application, " + error.response?.data?.message
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 rounded-lg shadow max-w-4xl mx-auto my-auto">
      <form onSubmit={handleSubmit}>
        {/* Application Details */}
        <h2 className="text-xl font-bold mb-4">{id ? "Edit Application" : "Add New Application"}</h2>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company *
            </label>
            <AsyncSelect
              placeholder="Search company name..."
              cacheOptions
              defaultOptions
              loadOptions={handleCompanySearch}
              onChange={handleCompanyChange}
              value={selectedCompany}
              inputValue={inputValue}
              onInputChange={setInputValue}
              isClearable
              styles={customStyles}
              className="text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Position Title *</label>
            <input
              type="text"
              name="positionTitle"
              value={formData.positionTitle}
              onChange={handleChange}
              placeholder="e.g., Senior Frontend Developer"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Engineering, Marketing"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Application Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Current Status *</label>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
              required
            >
              <option value="">Select Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer Received">Offer Received</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Application Date *</label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Priority Level</label>
            <select
              name="priorityLevel"
              value={formData.priorityLevel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Work Mode</label>
            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Salary Range (Min)</label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="e.g., 80000"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Salary Range (Max)</label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="e.g., 120000"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Job Posting URL</label>
            <input
              type="url"
              name="jobPostingUrl"
              value={formData.jobPostingUrl}
              onChange={handleChange}
              placeholder="https://company.com/careers/job-posting"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Contact Information */}
        <h2 className="text-xl font-bold mb-4 mt-8">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-1">Recruiter Name</label>
            <input
              type="text"
              name="recruiterName"
              value={formData.recruiterName}
              onChange={handleChange}
              placeholder="e.g., John Smith"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Recruiter Email</label>
            <input
              type="email"
              name="recruiterEmail"
              value={formData.recruiterEmail}
              onChange={handleChange}
              placeholder="recruiter@company.com"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">HR Contact</label>
            <input
              type="text"
              name="hrContact"
              value={formData.hrContact}
              onChange={handleChange}
              placeholder="HR Representative Name"
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Application Source</label>
            <select
              name="applicationSource"
              value={formData.applicationSource}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            >
              <option value="Company Website">Company Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Job Board">Job Board</option>
            </select>
          </div>
        </div>

        {/* Additional Information */}
        <h2 className="text-xl font-bold mb-4 mt-8">Additional Information</h2>
        <div className="mb-4">
          <label className="block text-sm mb-2">Cover Letter Submitted</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="coverLetterSubmitted"
                value="Yes"
                checked={formData.coverLetterSubmitted === "Yes"}
                onChange={handleRadioChange}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="coverLetterSubmitted"
                value="No"
                checked={formData.coverLetterSubmitted === "No"}
                onChange={handleRadioChange}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Resume Version Used</label>
          <input
            type="text"
            name="resumeVersion"
            value={formData.resumeVersion}
            onChange={handleChange}
            placeholder="e.g., Tech Resume v2.1"
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Notes & Comments</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional notes, interview feedback, or important details about this application..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
            rows={3}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Follow-up Date</label>
          <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {id ? "Update Application" : "+ Add Application"}
          </button>
        </div>
      </form>
    </div>
  );
};
