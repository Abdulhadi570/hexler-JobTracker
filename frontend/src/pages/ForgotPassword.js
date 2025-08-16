import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email is required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        try {
            await api.post("/auth/forgot-password", { email });
            setMessage("Password reset instructions have been sent to your email address.");
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send reset email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px'}}>
            <div style={{maxWidth: '400px', width: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '32px'}}>
                <div style={{textAlign: 'center', marginBottom: '24px'}}>
                    <div style={{width: '60px', height: '60px', margin: '0 auto 16px', background: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <svg style={{width: '24px', height: '24px', color: '#2563eb'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px'}}>Forgot Password?</h2>
                    <p style={{fontSize: '14px', color: '#6b7280'}}>Enter your email and we'll send you reset instructions</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px'}}>
                            <p style={{fontSize: '14px', color: '#b91c1c', margin: '0'}}>{error}</p>
                        </div>
                    )}
                    {message && (
                        <div style={{marginBottom: '16px', padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px'}}>
                            <p style={{fontSize: '14px', color: '#15803d', margin: '0'}}>{message}</p>
                        </div>
                    )}
                    
                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{width: '100%', padding: '12px', border: error && !message ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError("");
                            }}
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{width: '100%', padding: '12px', background: loading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px'}}
                    >
                        {loading ? 'Sending...' : 'Send Reset Instructions'}
                    </button>
                    
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>
                            Remember your password?{' '}
                            <Link to="/" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '500'}}>
                                Back to Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
