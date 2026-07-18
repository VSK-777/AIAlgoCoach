import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
