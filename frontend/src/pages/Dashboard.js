import { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useState({
        search: "",
        status: "all",
        sort: "desc"
    });
    const { token, logout } = useContext(AuthContext);

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const query = new URLSearchParams({
                search: params.search,
                status: params.status,
                sort: params.sort
            }).toString();

            const res = await api.get(`/jobs?${query}`, {
                headers: { Authorization: `Bearer ${token}` } 
            });
            setJobs(res.data.data || []);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setError("Failed to fetch jobs. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [token, params.search, params.status, params.sort]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchJobs();
        }, 300);
        return () => clearTimeout(timer);
    }, [fetchJobs]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this job?")) return;
        try {
            await api.delete(`/jobs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchJobs();
        } catch (err) {
            console.error("Error deleting job:", err);
            alert("Failed to delete job. Please try again.");
        }
    };

    return (
        <div style={{minHeight: '100vh', background: '#f8fafc', padding: '20px'}}>
            {/* Header */}
            <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '24px', padding: '24px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <h1 style={{fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0'}}>
                            Job Tracker Dashboard
                        </h1>
                        <p style={{fontSize: '14px', color: '#6b7280', margin: '0'}}>Manage your job applications with ease</p>
                    </div>
                    <button
                        onClick={logout}
                        style={{padding: '12px 24px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer'}}
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{maxWidth: '1200px', margin: '0 auto'}}>
                {/* Stats Cards */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px'}}>
                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px'}}>
                                <svg style={{width: '20px', height: '20px', color: '#2563eb'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 4px 0'}}>Total Applications</p>
                                <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>{jobs.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '40px', height: '40px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px'}}>
                                <svg style={{width: '20px', height: '20px', color: '#d97706'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 4px 0'}}>Pending</p>
                                <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>{jobs.filter(job => job.status === 'Applied').length}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '40px', height: '40px', background: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px'}}>
                                <svg style={{width: '20px', height: '20px', color: '#16a34a'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 4px 0'}}>Interviews</p>
                                <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>{jobs.filter(job => job.status === 'Interview').length}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '40px', height: '40px', background: '#f3e8ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px'}}>
                                <svg style={{width: '20px', height: '20px', color: '#9333ea'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <p style={{fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: '0 0 4px 0'}}>Offers</p>
                                <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0'}}>{jobs.filter(job => job.status === 'Offer').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px', marginBottom: '24px'}}>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px'}}>
                        <input
                            type="text"
                            placeholder="Search by position, company..."
                            style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                            value={params.search}
                            onChange={(e) => setParams(p => ({ ...p, search: e.target.value }))}
                        />
                        <select 
                            value={params.status} 
                            onChange={(e) => setParams(p => ({ ...p, status: e.target.value }))} 
                            style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                        >
                            <option value="all">All Statuses</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Accepted">Accepted</option>
                        </select>
                        <select 
                            value={params.sort} 
                            onChange={(e) => setParams(p => ({ ...p, sort: e.target.value }))} 
                            style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                        >
                            <option value="desc">Sort by Date (Newest)</option>
                            <option value="asc">Sort by Date (Oldest)</option>
                        </select>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <Link
                            to="/jobs/new"
                            style={{display: 'inline-block', padding: '12px 24px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500'}}
                        >
                            Add New Job
                        </Link>
                    </div>
                </div>

                {error && (
                    <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', marginBottom: '24px'}}>
                        <p style={{color: '#b91c1c', margin: '0', fontSize: '14px'}}>{error}</p>
                    </div>
                )}

                {loading ? (
                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '48px', textAlign: 'center'}}>
                        <p style={{fontSize: '16px', color: '#6b7280', margin: '0'}}>Loading your applications...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '48px', textAlign: 'center'}}>
                        <h3 style={{fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0'}}>No job applications yet</h3>
                        <p style={{fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0'}}>Get started by adding your first job application and track your progress.</p>
                        <Link
                            to="/jobs/new"
                            style={{display: 'inline-block', padding: '12px 24px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500'}}
                        >
                            Add Your First Job
                        </Link>
                    </div>
                ) : (
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px'}}>
                        {jobs.map((job) => (
                            <div key={job._id} style={{background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '20px'}}>
                                <div style={{marginBottom: '16px'}}>
                                    <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0'}}>
                                        {job.position}
                                    </h3>
                                    <p style={{fontSize: '14px', color: '#6b7280', margin: '0'}}>{job.company}</p>
                                </div>
                                
                                <div style={{marginBottom: '16px'}}>
                                    <span style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        borderRadius: '16px',
                                        background: job.status === 'Applied' ? '#dbeafe' : 
                                                   job.status === 'Interview' ? '#fef3c7' :
                                                   job.status === 'Offer' ? '#dcfce7' :
                                                   job.status === 'Rejected' ? '#fee2e2' : '#f3f4f6',
                                        color: job.status === 'Applied' ? '#1e40af' : 
                                               job.status === 'Interview' ? '#92400e' :
                                               job.status === 'Offer' ? '#166534' :
                                               job.status === 'Rejected' ? '#dc2626' : '#374151'
                                    }}>
                                        {job.status}
                                    </span>
                                </div>
                                
                                <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '16px'}}>
                                    Applied {new Date(job.applicationDate).toLocaleDateString()}
                                </div>
                                
                                <div style={{display: 'flex', gap: '8px'}}>
                                    <Link
                                        to={`/jobs/edit/${job._id}`}
                                        style={{flex: '1', padding: '8px 16px', background: '#e0e7ff', color: '#3730a3', textDecoration: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '500', textAlign: 'center'}}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        style={{flex: '1', padding: '8px 16px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer'}}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
