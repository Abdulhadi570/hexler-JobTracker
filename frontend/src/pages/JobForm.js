import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [form, setForm] = useState({
    position: "",
    company: "",
    applicationDate: "",
    jobLink: "",
    status: "Applied",
    notes: "",
  });
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      api
        .get(`/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const jobData = res.data;
          // Ensure date is in YYYY-MM-DD format for the input
          jobData.applicationDate = jobData.applicationDate ? new Date(jobData.applicationDate).toISOString().slice(0, 10) : "";
          setForm(jobData);
        })
        .catch((err) => {
          console.error("Error loading job:", err);
          setErrors({ general: "Failed to load job details. Please try again." });
        });
    }
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'resume') setResume(files[0]);
    if (name === 'profilePhoto') setProfilePhoto(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (resume) fd.append("resume", resume);
    if (profilePhoto) fd.append("profilePhoto", profilePhoto);

    try {
      if (id) {
        await api.put(`/jobs/${id}`, fd, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/jobs", fd, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate("/dashboard");
    } catch (err) {
      console.error("Error saving job:", err);
      const serverErrors = err.response?.data?.errors || {};
      const generalError = err.response?.data?.message || "Failed to save job. Please check your input and try again.";
      setErrors({ ...serverErrors, general: generalError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {id ? "Edit Job Application" : "Add New Job Application"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {id ? "Update your job application details" : "Track your new job application"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-xl rounded-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {errors.general && <p className="text-center text-sm text-red-600 mb-4">{errors.general}</p>}
            {/* Position and Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  id="position"
                  type="text"
                  name="position"
                  required
                  placeholder="e.g. Software Engineer"
                  className={`appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${errors.position ? 'border-red-500' : 'border-gray-300'}`}
                  value={form.position}
                  onChange={handleInputChange}
                />
                {errors.position && <p className="mt-1 text-xs text-red-600">{errors.position}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. Google"
                  className={`appearance-none block w-full px-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${errors.company ? 'border-red-500' : 'border-gray-300'}`}
                  value={form.company}
                  onChange={handleInputChange}
                />
                {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company}</p>}
              </div>
            </div>

            {/* Application Date and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Application Date *
                </label>
                <input
                  id="applicationDate"
                  type="date"
                  name="applicationDate"
                  required
                  className={`appearance-none block w-full px-3 py-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors ${errors.applicationDate ? 'border-red-500' : 'border-gray-300'}`}
                  value={form.applicationDate}
                  onChange={handleInputChange}
                />
                {errors.applicationDate && <p className="mt-1 text-xs text-red-600">{errors.applicationDate}</p>}
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                  value={form.status}
                  onChange={handleInputChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
            </div>

            {/* Job Link */}
            <div>
              <label htmlFor="jobLink" className="block text-sm font-medium text-gray-700 mb-2">
                Job Link
              </label>
              <input
                id="jobLink"
                type="url"
                name="jobLink"
                placeholder="https://company.com/jobs/position"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                value={form.jobLink}
                onChange={handleInputChange}
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                name="notes"
                placeholder="Add any notes about this application..."
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors resize-none"
                value={form.notes}
                onChange={handleInputChange}
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                    onChange={handleFileChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">{resume ? resume.name : "PDF, DOC, DOCX up to 5MB"}</p>
                </div>
              </div>
              <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="relative">
                  <input
                    id="profilePhoto"
                    type="file"
                    name="profilePhoto"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors"
                    onChange={handleFileChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">{profilePhoto ? profilePhoto.name : "JPG, PNG up to 2MB"}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {loading ? (id ? "Updating..." : "Adding...") : (id ? "Update Job" : "Add Job")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
