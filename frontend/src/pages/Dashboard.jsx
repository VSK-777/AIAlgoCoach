import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Trophy, Star, Activity as ActivityIcon, Target } from 'lucide-react';
import RatingChart from '../components/charts/RatingChart';
import TopicRadar from '../components/charts/TopicRadar';
import DifficultyDonut from '../components/charts/DifficultyDonut';
import ActivityHeatmap from '../components/charts/ActivityHeatmap';

const MetricCard = ({ title, value, subtitle, icon: Icon, colorClass }) => (
    <div className="glass-card flex items-start gap-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
            <Icon size={24} className="text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{value}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
    </div>
);

const Dashboard = () => {
    const { handle } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const targetHandle = handle || JSON.parse(localStorage.getItem('user'))?.codeforcesHandle;



    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!targetHandle) {
                setError('No Codeforces handle specified.');
                setLoading(false);
                return;
            }
            
            setLoading(true);
            setError('');
            try {

                const res = await api.get(`/analytics/${targetHandle}`);

                setAnalytics(res.data);
            } catch (err) {

                setError('Failed to fetch analytics. Please check the handle and try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [targetHandle]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-lg text-center shadow-sm">
                    <p className="font-medium text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!analytics) return null;

    const { userInfo, ratingHistory, topicStrength, difficultyDistribution, activityHeatmap, totalSubmissions, solvedProblems, strongestTopic, weakestTopic } = analytics;

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="glass-card bg-gradient-to-br from-white/60 to-primary/5 flex flex-col md:flex-row items-center gap-6 p-8">
                <img 
                    src={userInfo.avatar} 
                    alt="avatar" 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-slate-100"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/96'}}
                />
                <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-slate-900">{userInfo.handle}</h1>
                    <p className="text-lg text-slate-600 capitalize font-medium">{userInfo.rank || 'Unrated'}</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-center bg-white/60 px-4 py-2 rounded-xl shadow-sm border border-white/40">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Current Rating</p>
                        <p className="text-xl font-bold text-primary">{userInfo.rating || 'N/A'}</p>
                    </div>
                    <div className="text-center bg-white/60 px-4 py-2 rounded-xl shadow-sm border border-white/40">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Max Rating</p>
                        <p className="text-xl font-bold text-secondary">{userInfo.maxRating || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard 
                    title="Total Solved" 
                    value={solvedProblems} 
                    subtitle={`${totalSubmissions} total submissions`}
                    icon={Trophy} 
                    colorClass="bg-amber-400 shadow-amber-400/30"
                />
                <MetricCard 
                    title="Strongest Topic" 
                    value={strongestTopic ? strongestTopic.replace('-', ' ') : 'N/A'} 
                    subtitle="Based on accepted solutions"
                    icon={Star} 
                    colorClass="bg-primary shadow-primary/30"
                />
                <MetricCard 
                    title="Weakest Topic" 
                    value={weakestTopic ? weakestTopic.replace('-', ' ') : 'N/A'} 
                    subtitle="Needs more practice"
                    icon={Target} 
                    colorClass="bg-red-400 shadow-red-400/30"
                />
                <MetricCard 
                    title="Contest Count" 
                    value={ratingHistory.length} 
                    subtitle="Total rated contests"
                    icon={ActivityIcon} 
                    colorClass="bg-secondary shadow-secondary/30"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Rating Progression</h3>
                    <div className="flex-1 w-full min-h-0">
                        <RatingChart data={ratingHistory} />
                    </div>
                </div>
                <div className="glass-card h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Difficulty Distribution</h3>
                    <div className="flex-1 w-full min-h-0">
                        <DifficultyDonut data={difficultyDistribution} />
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-2 glass-card h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Topic Mastery</h3>
                    <div className="flex-1 w-full min-h-0">
                        <TopicRadar data={topicStrength} />
                    </div>
                </div>
                <div className="xl:col-span-3 glass-card h-[400px] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Activity Heatmap</h3>
                    <div className="flex-1 w-full min-h-0 relative overflow-hidden">
                        <ActivityHeatmap data={activityHeatmap} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
