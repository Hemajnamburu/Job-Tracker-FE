import React, { useEffect, useState, FormEvent, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import api from "../api/axios";
import { AuthContext } from "../context/authContext";

export type InterviewType =
  | "HR Round"
  | "Technical"
  | "System Design"
  | "Final Round";

export type InterviewFormat = "Video Call" | "Phone Call" | "On-site";

export interface InterviewFormData {
  _id: string | null;
  applicationId: string;
  interviewType: InterviewType;
  interviewDate: string;
  time: string;
  duration: string;
  format: InterviewFormat;
  meetingLink: string;
  interviewerName: string;
  interviewerEmail: string;
  notes: string;
}

export interface ScheduleInterviewProps {
  initialData?: InterviewFormData;
}

const emptyForm: InterviewFormData = {
  _id: null,
  applicationId: "",
  interviewType: "HR Round",
  interviewDate: "",
  time: "",
  duration: "1 hour",
  format: "Video Call",
  meetingLink: "",
  interviewerName: "",
  interviewerEmail: "",
  notes: "",
};

export default function ScheduleInterview({
  initialData,
}: ScheduleInterviewProps) {
  const [form, setForm] = useState<InterviewFormData>(emptyForm);
  const { data: jobs = [], isLoading } = useJobs();
  const token = useContext(AuthContext)?.token;
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddApplication = () => {
    navigate("/add-application");
  };

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else if (id) {
      // Fetch interview data for editing
      const fetchInterview = async () => {
        try {
          const res = await api.get(`/interviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const interview = res.data;
          // Map Interview to InterviewFormData
          setForm({
            _id: interview._id,
            applicationId: interview.applicationId?._id || interview.applicationId || '',
            interviewType: interview.interviewType,
            interviewDate: interview.interviewDate ? interview.interviewDate.split('T')[0] : '', // Extract YYYY-MM-DD
            time: interview.time,
            duration: interview.duration,
            format: interview.format,
            meetingLink: interview.meetingLink,
            interviewerName: interview.interviewerName,
            interviewerEmail: interview.interviewerEmail,
            notes: interview.notes,
          });
          console.log("fsfsa", interview)
        } catch (error) {
          console.error("Failed to fetch interview", error);
        }
      };
      fetchInterview();
    }
  }, [initialData, id, token]);

  const handleChange = (field: keyof InterviewFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const dataToSend = { ...form };
      if (initialData?._id) {
        await api.put(`/interviews/${initialData._id}`, dataToSend, config);
      } else {
        await api.post("/interviews", dataToSend, config);
      }

      navigate("/interviews");
    } catch (error) {
      console.error("Error submitting interview:", error);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
      {/* Left: Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">Interview Details</h2>

        {/* Job Application Select */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Select Job Application *
          </label>

          <div className="flex gap-2 items-center">
            <select
              value={form.applicationId}
              required
              onChange={(e) => handleChange("applicationId", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="">Choose an application...</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.companyName} - {job.positionTitle}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddApplication}
              className="text-sm text-blue-600 hover:underline whitespace-nowrap"
            >
              + Add Application
            </button>
          </div>

          {jobs.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              No applications found.{" "}
              <button
                type="button"
                onClick={handleAddApplication}
                className="text-blue-600 hover:underline"
              >
                Add one now
              </button>
            </p>
          )}
        </div>

        {/* Interview Type Buttons */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Interview Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "HR Round", desc: "Initial screening" },
              { label: "Technical", desc: "Coding & skills" },
              { label: "System Design", desc: "Architecture discussion" },
              { label: "Final Round", desc: "Decision making" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.label}
                onClick={() =>
                  handleChange("interviewType", opt.label as InterviewType)
                }
                className={`border rounded px-3 py-2 text-sm ${
                  form.interviewType === opt.label
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="font-medium">{opt.label}</div>
                <div className="text-xs">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* interviewDate + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Interview Date *
            </label>
            <input
              type="date"
              required
              value={form.interviewDate}
              onChange={(e) => handleChange("interviewDate", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time *</label>
            <input
              type="time"
              value={form.time}
              required
              onChange={(e) => handleChange("time", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <select
            value={form.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="30 mins">30 mins</option>
            <option value="1 hour">1 hour</option>
            <option value="1.5 hours">1.5 hours</option>
          </select>
        </div>

        {/* Interview Format Buttons */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Interview Format
          </label>
          <div className="flex gap-4">
            {["Video Call", "Phone Call", "On-site"].map((format) => (
              <button
                type="button"
                key={format}
                onClick={() =>
                  handleChange("format", format as InterviewFormat)
                }
                className={`border rounded px-3 py-2 text-sm ${
                  form.format === format
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Meeting Link */}
        <div>
          <label className="block text-sm font-medium mb-1">Meeting Link</label>
          <input
            type="url"
            value={form.meetingLink}
            onChange={(e) => handleChange("meetingLink", e.target.value)}
            placeholder="https://meet.google.com/..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Interviewer Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Interviewer Name
            </label>
            <input
              type="text"
              value={form.interviewerName}
              onChange={(e) => handleChange("interviewerName", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.interviewerEmail}
              onChange={(e) => handleChange("interviewerEmail", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Add any additional notes or preparation items..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
          >
            {id || initialData ? "Update Interview" : "Schedule Interview"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Right: Sidebar */}
      <div className="space-y-6">
        {/* Quick Tips */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-sm">
          <h3 className="text-base font-semibold mb-2">Quick Tips</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>✅ Schedule at least 24 hours in advance</li>
            <li>✅ Test video/audio before the interview</li>
            <li>✅ Prepare questions about the role</li>
            <li>✅ Set calendar reminders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
