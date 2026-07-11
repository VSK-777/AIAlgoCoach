import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [codeforcesHandle, setCodeforcesHandle] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateUsername = (val) => {
        const errs = [];
        if (!val) errs.push("Username is required.");
        else {
            if (val.length < 3 || val.length > 30) errs.push("Username must be between 3 and 30 characters.");
            if (/\s/.test(val)) errs.push("Spaces are not allowed.");
            else if (!/^[A-Za-z0-9_.]+$/.test(val)) errs.push("Username may contain only letters, numbers, underscores (_) and periods (.).");
        }
        return errs;
    };

    const validatePassword = (val) => {
        const errs = [];
        if (!val) errs.push("Password is required.");
        else {
            if (val.length < 8 || val.length > 64) errs.push("Password must be between 8 and 64 characters.");
            if (!/[A-Z]/.test(val)) errs.push("Password must contain at least one uppercase letter.");
            if (!/[a-z]/.test(val)) errs.push("Password must contain at least one lowercase letter.");
            if (!/\d/.test(val)) errs.push("Password must contain at least one number.");
            if (!/[^a-zA-Z\d\s]/.test(val)) errs.push("Password must contain at least one special character.");
        }
        return errs;
    };

    const validateCodeforcesHandle = (val) => {
        const errs = [];
        if (!val) errs.push("Codeforces handle is required.");
        else {
            if (val.length < 1 || val.length > 30) errs.push("Codeforces handle must be between 1 and 30 characters.");
            if (!/^[A-Za-z0-9_.-]+$/.test(val)) errs.push("Invalid Codeforces handle.");
        }
        return errs;
    };

    const handleUsernameChange = (e) => {
        const val = e.target.value;
        setUsername(val);
        if (fieldErrors.username) {
            const errs = validateUsername(val);
            setFieldErrors(prev => {
                const newErrs = { ...prev };
                if (errs.length === 0) delete newErrs.username;
                else newErrs.username = errs;
                return newErrs;
            });
        }
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        if (fieldErrors.password) {
            const errs = validatePassword(val);
            setFieldErrors(prev => {
                const newErrs = { ...prev };
                if (errs.length === 0) delete newErrs.password;
                else newErrs.password = errs;
                return newErrs;
            });
        }
    };

    const handleCodeforcesHandleChange = (e) => {
        const val = e.target.value;
        setCodeforcesHandle(val);
        if (fieldErrors.codeforcesHandle) {
            const errs = validateCodeforcesHandle(val);
            setFieldErrors(prev => {
                const newErrs = { ...prev };
                if (errs.length === 0) delete newErrs.codeforcesHandle;
                else newErrs.codeforcesHandle = errs;
                return newErrs;
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});
        setIsLoading(true);

        // Pre-validate to avoid unnecessary backend calls (optional, but good UX)
        const uErrs = validateUsername(username);
        const pErrs = validatePassword(password);
        const cErrs = validateCodeforcesHandle(codeforcesHandle);
        if (uErrs.length > 0 || pErrs.length > 0 || cErrs.length > 0) {
            const errObj = {};
            if (uErrs.length > 0) errObj.username = uErrs;
            if (pErrs.length > 0) errObj.password = pErrs;
            if (cErrs.length > 0) errObj.codeforcesHandle = cErrs;
            setFieldErrors(errObj);
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.post('/auth/register', {
                username,
                password,
                codeforcesHandle
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
                setError(''); // Hide generic error if we have field errors
            } else {
                setFieldErrors({});
                setError(message || 'Something went wrong. Please try again later.');
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
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2">Join AIAlgoCoach today</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-5" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                        <input 
                            type="text" 
                            className={getInputClass('username')} 
                            placeholder="Choose a username"
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
                        <label className="block text-sm font-medium text-slate-700 mb-1">Codeforces Handle</label>
                        <input 
                            type="text" 
                            className={getInputClass('codeforcesHandle')} 
                            placeholder="e.g. tourist"
                            value={codeforcesHandle}
                            onChange={handleCodeforcesHandleChange}
                        />
                        {fieldErrors.codeforcesHandle && fieldErrors.codeforcesHandle.length > 0 && (
                            <div className="mt-1 space-y-1">
                                {fieldErrors.codeforcesHandle.map((err, idx) => (
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
                            placeholder="Create a password"
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
                        ) : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-primary hover:text-primary-hover font-medium">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
