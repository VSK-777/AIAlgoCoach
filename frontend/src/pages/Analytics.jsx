import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#10b981'];

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchAdvancedAnalytics = async () => {
            if (!user.codeforcesHandle) {
                setError('No Codeforces handle specified.');
                setLoading(false);
                return;
            }
            try {
                const res = await api.get(`/analytics/advanced/${user.codeforcesHandle}`);
                setData(res.data);
            } catch (err) {
                setError('Failed to fetch advanced analytics.');
            } finally {
                setLoading(false);
            }
        };
        fetchAdvancedAnalytics();
    }, [user.codeforcesHandle]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <p className="text-red-500 font-medium">{error}</p>
            </div>
        );
    }

    if (!data) return null;

    // Formatting Data
    const languageData = Object.entries(data.languageDistribution || {})
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    const verdictData = Object.entries(data.verdictDistribution || {})
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);

    // Top 15 tags
    const tagsData = Object.entries(data.allTagsDistribution || {})
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 15);

    return (
        <div className="space-y-6">
            <div className="glass-card flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                        <Activity size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Advanced Analytics</h1>
                        <p className="text-slate-500 text-sm">Deep dive into your Codeforces submission history</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-500 uppercase">Success Rate</p>
                    <p className="text-3xl font-bold text-primary">{data.successRate}%</p>
                    <p className="text-xs text-slate-400 mt-1">{data.successfulSubmissions} / {data.totalSubmissions} submissions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Language Distribution */}
                <div className="glass-card h-[450px] flex flex-col pb-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Language Preferences</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={languageData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {languageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Verdict Distribution */}
                <div className="glass-card h-[450px] flex flex-col pb-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Submission Verdicts</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={verdictData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* All Tags Distribution */}
                <div className="glass-card h-[450px] flex flex-col lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Comprehensive Tag Mastery (Top 15)</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={tagsData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#475569' }} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#14b8a6" radius={[0, 4, 4, 0]} barSize={20}>
                                    {tagsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
