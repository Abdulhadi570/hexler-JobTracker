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
          const jobData = res.data.data || res.data;
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
    <div style={{minHeight: '100vh', background: '#f8fafc', padding: '20px'}}>
      <div style={{maxWidth: '600px', margin: '0 auto'}}>
        {/* Header */}
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <h2 style={{fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0'}}>
            {id ? "Edit Job Application" : "Add New Job Application"}
          </h2>
          <p style={{fontSize: '14px', color: '#6b7280', margin: '0'}}>
            {id ? "Update your job application details" : "Track your new job application"}
          </p>
        </div>

        {/* Form */}
        <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '32px'}}>
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div style={{marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px'}}>
                <p style={{fontSize: '14px', color: '#b91c1c', margin: '0'}}>{errors.general}</p>
              </div>
            )}

            {/* Position and Company */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  required
                  placeholder="e.g. Software Engineer"
                  style={{width: '100%', padding: '12px', border: errors.position ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                  value={form.position}
                  onChange={handleInputChange}
                />
                {errors.position && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.position}</p>}
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Company *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. Google"
                  style={{width: '100%', padding: '12px', border: errors.company ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                  value={form.company}
                  onChange={handleInputChange}
                />
                {errors.company && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.company}</p>}
              </div>
            </div>

            {/* Application Date and Status */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Application Date *
                </label>
                <input
                  type="date"
                  name="applicationDate"
                  required
                  style={{width: '100%', padding: '12px', border: errors.applicationDate ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                  value={form.applicationDate}
                  onChange={handleInputChange}
                />
                {errors.applicationDate && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.applicationDate}</p>}
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Status
                </label>
                <select
                  name="status"
                  style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
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
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                Job Link
              </label>
              <input
                type="url"
                name="jobLink"
                placeholder="https://company.com/jobs/position"
                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                value={form.jobLink}
                onChange={handleInputChange}
              />
            </div>

            {/* Notes */}
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                Notes
              </label>
              <textarea
                rows={4}
                name="notes"
                placeholder="Add any notes about this application..."
                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box'}}
                value={form.notes}
                onChange={handleInputChange}
              />
            </div>

            {/* File Uploads */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Resume
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  style={{width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box'}}
                  onChange={handleFileChange}
                />
                <p style={{fontSize: '12px', color: '#6b7280', margin: '4px 0 0'}}>{resume ? resume.name : "PDF, DOC, DOCX up to 5MB"}</p>
              </div>
              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>
                  Profile Photo
                </label>
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  style={{width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box'}}
                  onChange={handleFileChange}
                />
                <p style={{fontSize: '12px', color: '#6b7280', margin: '4px 0 0'}}>{profilePhoto ? profilePhoto.name : "JPG, PNG up to 2MB"}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                style={{flex: '1', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', fontWeight: '500', color: '#374151', background: 'white', cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{flex: '1', padding: '12px', background: loading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer'}}
              >
                {loading ? (id ? "Updating..." : "Adding...") : (id ? "Update Job" : "Add Job")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
