import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Brain, Activity, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: `/dashboard` },
        { name: 'AI Insights', icon: Brain, path: '/ai-insights' },
        { name: 'Analytics', icon: Activity, path: '/analytics' },
    ];

    return (
        <aside 
            className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col relative z-20 shadow-sm
                ${isOpen ? 'w-64' : 'w-20'} 
                hidden md:flex`}
        >
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
                {isOpen && (
                    <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        AIAlgoCoach
                    </div>
                )}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors mx-auto"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <div className="flex-1 py-6 px-3 flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center px-3 py-3 rounded-xl transition-all duration-200 group
                            ${isActive 
                                ? 'bg-primary/10 text-primary font-medium' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }
                        `}
                        title={!isOpen ? item.name : ''}
                    >
                        <item.icon size={22} className={`min-w-[22px] ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isOpen && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-slate-100">
                {isOpen && (
                    <div className="mb-4 px-2">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Account</p>
                        <p className="text-sm font-medium text-slate-800 truncate mt-1">{user.username}</p>
                    </div>
                )}
                <button 
                    onClick={handleLogout}
                    className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-50 w-full ${!isOpen ? 'justify-center' : ''}`}
                    title={!isOpen ? 'Logout' : ''}
                >
                    <LogOut size={22} className={`min-w-[22px] ${isOpen ? 'mr-3' : ''}`} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;