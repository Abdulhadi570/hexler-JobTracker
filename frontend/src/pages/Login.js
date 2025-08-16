import { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { setToken, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (token) navigate("/dashboard");
    }, [token, navigate]);

    useEffect(() => {
        if (location.state?.message) setSuccessMessage(location.state.message);
    }, [location.state]);

    useEffect(() => {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
            setFormData(prev => ({ ...prev, email: rememberedEmail }));
            setRememberMe(true);
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setErrors({});
        try {
            const res = await api.post("/auth/login", { email: formData.email, password: formData.password });
            setToken(res.data.token);
            if (rememberMe) localStorage.setItem("rememberedEmail", formData.email);
            else localStorage.removeItem("rememberedEmail");
            navigate("/dashboard");
        } catch (err) {
            setErrors({ general: err.response?.data?.message || "Login failed. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px'}}>
            <div style={{maxWidth: '400px', width: '100%', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '32px'}}>
                <div style={{textAlign: 'center', marginBottom: '24px'}}>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px'}}>Welcome Back</h2>
                    <p style={{fontSize: '14px', color: '#6b7280'}}>Sign in to track your dream job</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    {errors.general && (
                        <div style={{marginBottom: '16px', padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px'}}>
                            <p style={{fontSize: '14px', color: '#b91c1c', margin: '0'}}>{errors.general}</p>
                        </div>
                    )}
                    {successMessage && (
                        <div style={{marginBottom: '16px', padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px'}}>
                            <p style={{fontSize: '14px', color: '#15803d', margin: '0'}}>{successMessage}</p>
                        </div>
                    )}
                    
                    <div style={{marginBottom: '16px'}}>
                        <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px'}}>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
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
                                placeholder="Enter your password"
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
                    
                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'flex', alignItems: 'center', fontSize: '14px', color: '#374151'}}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{marginRight: '8px'}}
                            />
                            Remember me
                        </label>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{width: '100%', padding: '12px', background: loading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '16px'}}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>
                            <Link to="/forgot-password" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '500'}}>
                                Forgot your password?
                            </Link>
                        </p>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>
                            Don't have an account?{' '}
                            <Link to="/register" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '500'}}>
                                Create one here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
