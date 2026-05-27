import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopicRadar = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                No topic data available
            </div>
        );
    }

    const chartData = Object.entries(data).map(([subject, A]) => ({
        subject: subject.charAt(0).toUpperCase() + subject.slice(1).replace('-', ' '),
        A,
        fullMark: Math.max(...Object.values(data)) || 10
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="62%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                />
                <Radar
                    name="Problems Solved"
                    dataKey="A"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    fill="#14b8a6"
                    fillOpacity={0.4}
                />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        backdropFilter: 'blur(4px)',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default TopicRadar;
