import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RatingChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                No rating history available
            </div>
        );
    }

    // Format data for Recharts
    const chartData = data.map(contest => {
        const date = new Date(contest.ratingUpdateTimeSeconds * 1000);
        return {
            name: date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
            fullDate: date.toLocaleDateString(),
            rating: contest.newRating,
            contestName: contest.contestName,
            rank: contest.rank
        };
    });

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-4 rounded-xl shadow-lg">
                    <p className="font-bold text-slate-800 text-sm mb-1">{data.contestName}</p>
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">Date:</span>
                        <span className="font-medium">{data.fullDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-500">Rank:</span>
                        <span className="font-medium text-slate-700">{data.rank}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-2 mt-2">
                        <span className="text-slate-500">New Rating:</span>
                        <span className="font-bold text-primary text-sm">{data.rating}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    minTickGap={30}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRating)" 
                    activeDot={{ r: 6, fill: '#6366f1', stroke: '#ffffff', strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default RatingChart;