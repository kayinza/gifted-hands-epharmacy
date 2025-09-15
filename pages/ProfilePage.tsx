import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import { UserIcon } from '../components/icons';

export const ProfilePage: React.FC = () => {
    const context = useContext(AppContext);

    useEffect(() => {
        if (context && !context.isAuthenticated) {
            context.navigateTo(Page.Login);
        }
    }, [context]);

    if (!context || !context.isAuthenticated || !context.user) {
        // Render nothing while redirecting
        return null;
    }

    const { user, logout } = context;

    return (
        <div className="bg-light min-h-screen py-12 flex items-center">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-8 text-center animate-fade-in-up">
                    <div className="mx-auto mb-4 bg-primary/10 rounded-full h-24 w-24 flex items-center justify-center">
                        <UserIcon className="w-16 h-16 text-primary" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-dark mb-2">{user.name}</h1>
                    <p className="text-gray-600 mb-8">{user.email}</p>
                    
                    <button 
                        onClick={logout}
                        className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};