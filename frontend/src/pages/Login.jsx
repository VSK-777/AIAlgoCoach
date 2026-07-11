import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        const val = e.target.value;
        setUsername(val);
        if (fieldErrors.username) {
            setFieldErrors(prev => {
                const newErrs = { ...prev };
                if (val.trim()) delete newErrs.username;
                else newErrs.username = ["Username is required."];
                return newErrs;
            });
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        if (fieldErrors.password) {
            setFieldErrors(prev => {
                const newErrs = { ...prev };
                if (val.trim()) delete newErrs.password;
                else newErrs.password = ["Password is required."];
                return newErrs;
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});
        setIsLoading(true);

        // Pre-validate empty fields to improve UX
        let hasEmpty = false;
        const errObj = {};
        if (!username.trim()) {
            errObj.username = ["Username is required."];
            hasEmpty = true;
        }
        if (!password.trim()) {
            errObj.password = ["Password is required."];
            hasEmpty = true;
        }
        if (hasEmpty) {
            setFieldErrors(errObj);
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.post('/auth/login', {
                username,
                password
            });
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user', JSON.stringify({
                username: res.data.username,
                codeforcesHandle: res.data.codeforcesHandle
            }));
            navigate('/dashboard');
        } catch (err) {
            const status = err.response?.status;
            const message = err.response?.data?.message;
            const errors = err.response?.data?.data;

            if (status === 400 && errors && Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                setError('');
            } else {
                setFieldErrors({});
                setError(message || 'Invalid username or password.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getInputClass = (field) => {
        return `glass-input ${fieldErrors[field] ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative px-4">
            <div className="absolute inset-0 bg-slate-50 overflow-hidden -z-20" />
            
            <div className="w-full max-w-md glass-card border border-white">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 mt-2">Sign in to AIAlgoCoach</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            className={getInputClass('username')} 
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {fieldErrors.username && fieldErrors.username.length > 0 && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.username.map((err, idx) => (
                                    <p key={idx} className="text-red-500 text-xs">❌ {err}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className={getInputClass('password')} 
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {fieldErrors.password && fieldErrors.password.length > 0 && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.password.map((err, idx) => (
                                    <p key={idx} className="text-red-500 text-xs">❌ {err}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="btn-primary w-full flex justify-center items-center mt-2"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-primary-hover font-medium">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
