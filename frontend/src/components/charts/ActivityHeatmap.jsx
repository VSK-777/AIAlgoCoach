import React, { useMemo } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const ActivityHeatmap = ({ data }) => {
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                No activity data available
            </div>
        );
    }

    const { weeks, monthLabels, colors } = useMemo(() => {
        // Build the grid for the last 52 weeks
        const today = new Date();
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // start of today
        
        // Start exactly 52 weeks (364 days) ago to keep grid consistent
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 364);
        
        // Adjust to start on a Sunday
        while (startDate.getDay() !== 0) {
            startDate.setDate(startDate.getDate() - 1);
        }

        const weeksArr = [];
        let currentWeek = [];
        let iterDate = new Date(startDate);
        const months = [];
        let lastMonth = -1;

        while (iterDate <= endDate) {
            const dateString = iterDate.getFullYear() + '-' + 
                               String(iterDate.getMonth() + 1).padStart(2, '0') + '-' + 
                               String(iterDate.getDate()).padStart(2, '0');
                               
            const count = data[dateString] || 0;
            
            currentWeek.push({
                date: new Date(iterDate),
                dateString,
                count
            });

            // Track month labels exactly on the 1st of the month
            if (iterDate.getDate() === 1) {
                // Avoid placing a label on the very first column to prevent clipping/overlap
                if (weeksArr.length > 0) {
                    months.push({
                        month: iterDate.toLocaleString('default', { month: 'short' }),
                        weekIndex: weeksArr.length
                    });
                }
            }

            if (currentWeek.length === 7) {
                weeksArr.push(currentWeek);
                currentWeek = [];
            }

            iterDate.setDate(iterDate.getDate() + 1);
        }

        if (currentWeek.length > 0) {
            weeksArr.push(currentWeek);
        }

        // Color intensity logic based on Codeforces/GitHub
        const getColor = (count) => {
            if (count === 0) return '#ebedf0'; // Slate 100
            if (count <= 1) return '#9be9a8';  // Light green
            if (count <= 3) return '#40c463';  // Medium green
            if (count <= 5) return '#30a14e';  // Dark green
            return '#216e39';                  // Darkest green
        };

        return { weeks: weeksArr, monthLabels: months, colors: getColor };
    }, [data]);

    return (
        <div className="w-full h-full flex flex-col justify-between overflow-x-auto custom-scrollbar pb-2 pt-6">
            <div className="min-w-max pr-4">
                <div className="flex gap-2">
                    {/* Day Labels */}
                    <div className="flex flex-col justify-end text-[10px] text-slate-400 pr-2 h-[125px] pb-1">
                        <span className="invisible">Sun</span>
                        <span>Mon</span>
                        <span className="invisible">Tue</span>
                        <span>Wed</span>
                        <span className="invisible">Thu</span>
                        <span>Fri</span>
                        <span className="invisible">Sat</span>
                    </div>

                    {/* Grid Area with Month Labels */}
                    <div className="flex flex-col">
                        {/* Month Labels */}
                        <div className="relative h-5 w-full text-xs text-slate-500">
                            {monthLabels.map((m, i) => (
                                <span 
                                    key={i} 
                                    className="absolute bottom-1" 
                                    style={{ left: `${m.weekIndex * 16}px` }}
                                >
                                    {m.month}
                                </span>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="flex gap-1 h-[105px]">
                            {weeks.map((week, wIndex) => (
                                <div key={wIndex} className="flex flex-col gap-1">
                                    {week.map((day, dIndex) => (
                                        <div
                                            key={dIndex}
                                            className="w-3 h-3 rounded-sm outline-none"
                                            style={{ backgroundColor: colors(day.count) }}
                                            data-tooltip-id="heatmap-tooltip"
                                            data-tooltip-content={`${day.count} submissions on ${day.date.toDateString()}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center justify-end text-xs text-slate-500 mt-4 gap-2 mr-4 min-w-max">
                <span>Less</span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-[#ebedf0]"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#9be9a8]"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#40c463]"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#30a14e]"></div>
                    <div className="w-3 h-3 rounded-sm bg-[#216e39]"></div>
                </div>
                <span>More</span>
            </div>
            
            <ReactTooltip 
                id="heatmap-tooltip" 
                place="top"
                className="!bg-slate-800 !text-xs !py-1 !px-2 !rounded-md !opacity-100 z-50"
            />
        </div>
    );
};

export default ActivityHeatmap;