import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setErrors({});
        try {
            const { confirmPassword, ...registerData } = formData;
            await api.post("/auth/register", registerData);
            navigate("/", { state: { message: "Registration successful! Please log in." } });
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
            setErrors({ general: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px'}}>
            <div style={{maxWidth: '400px', width: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '32px'}}>
                <div style={{textAlign: 'center', marginBottom: '24px'}}>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px'}}>Join Us Today</h2>
                    <p style={{fontSize: '14px', color: '#6b7280'}}>Create your account to start tracking jobs</p>
                </div>

                <form onSubmit={handleRegister}>
                    {errors.general && (
                        <div style={{marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px'}}>
                            <p style={{fontSize: '14px', color: '#b91c1c', margin: '0'}}>{errors.general}</p>
                        </div>
                    )}

                    <div style={{marginBottom: '16px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            style={{width: '100%', padding: '12px', border: errors.name ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.name}</p>}
                    </div>

                    <div style={{marginBottom: '16px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            style={{width: '100%', padding: '12px', border: errors.email ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.email}</p>}
                    </div>

                    <div style={{marginBottom: '16px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Password</label>
                        <div style={{position: 'relative'}}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a strong password"
                                style={{width: '100%', padding: '12px', paddingRight: '40px', border: errors.password ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'}}
                            >
                                {showPassword ? 'hide' : 'show'}
                            </button>
                        </div>
                        {errors.password && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.password}</p>}
                    </div>

                    <div style={{marginBottom: '16px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Confirm Password</label>
                        <div style={{position: 'relative'}}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                style={{width: '100%', padding: '12px', paddingRight: '40px', border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', boxSizing: 'border-box'}}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'}}
                            >
                                {showConfirmPassword ? 'hide' : 'show'}
                            </button>
                        </div>
                        {errors.confirmPassword && <p style={{fontSize: '12px', color: '#ef4444', margin: '4px 0 0'}}>{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{width: '100%', padding: '12px', background: loading ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px'}}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>
                            Already have an account?{' '}
                            <Link to="/" style={{color: '#10b981', textDecoration: 'none', fontWeight: '500'}}>
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
