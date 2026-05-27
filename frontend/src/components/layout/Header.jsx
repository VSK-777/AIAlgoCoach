import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/dashboard/${searchQuery.trim()}`);
        }
    };

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-10 shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 md:hidden"
                >
                    <Menu size={24} />
                </button>
                
                <form onSubmit={handleSearch} className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search any Codeforces handle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 w-64 lg:w-96 transition-all outline-none"
                    />
                </form>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500 relative">
                    <Bell size={20} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:shadow-md transition-all">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
            </div>
        </header>
    );
};

export default Header;
