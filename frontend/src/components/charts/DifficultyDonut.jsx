import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const DifficultyDonut = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                No difficulty data available
            </div>
        );
    }

    const chartData = [
        { name: 'Easy (≤1200)', value: data.Easy || 0, color: '#14b8a6' }, // Teal
        { name: 'Medium (≤1900)', value: data.Medium || 0, color: '#f59e0b' }, // Amber
        { name: 'Hard (>1900)', value: data.Hard || 0, color: '#ef4444' } // Red
    ].filter(item => item.value > 0);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-xl shadow-lg flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                    <div>
                        <p className="font-medium text-slate-800 text-sm">{data.name}</p>
                        <p className="text-slate-500 text-xs font-bold">{data.value} problems ({((data.value / total) * 100).toFixed(1)}%)</p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-slate-600 text-xs font-medium">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-3xl font-bold text-slate-800">{total}</span>
                <span className="text-xs text-slate-500 uppercase font-semibold">Total</span>
            </div>
        </div>
    );
};

export default DifficultyDonut;
