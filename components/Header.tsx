import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, SearchIcon } from './icons';

export const Header: React.FC = () => {
  const context = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!context) return null;

  const { navigateTo, getCartItemCount, isAuthenticated, user } = context;
  const cartItemCount = getCartItemCount();

  const navLinks = (
    <>
      <a onClick={() => navigateTo(Page.Home)} className="cursor-pointer text-gray-700 hover:text-primary transition-colors duration-200">Home</a>
      <a onClick={() => navigateTo(Page.Products)} className="cursor-pointer text-gray-700 hover:text-primary transition-colors duration-200">Medicines</a>
      <a href="#" className="cursor-pointer text-gray-700 hover:text-primary transition-colors duration-200">Consultation</a>
      <a href="#" className="cursor-pointer text-gray-700 hover:text-primary transition-colors duration-200">About Us</a>
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a onClick={() => navigateTo(Page.Home)} className="cursor-pointer flex-shrink-0 flex items-center gap-2">
              <PlusCircleIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-dark">Gifted Hands</span>
            </a>
          </div>

          <div className="hidden md:flex md:ml-10 md:space-x-8">
              {navLinks}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <input type="text" placeholder="Search for medicine..." className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-40 md:w-64" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            <button onClick={() => navigateTo(Page.Cart)} className="relative p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-full text-white bg-red-500 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button onClick={() => navigateTo(isAuthenticated ? Page.Profile : Page.Login)} className="p-2 text-gray-600 hover:text-primary rounded-full hover:bg-gray-100 transition-colors">
              <UserIcon className="h-6 w-6" />
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600 hover:text-primary rounded-md hover:bg-gray-100 transition-colors">
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks}
             <div className="pt-4 relative">
              <input type="text" placeholder="Search..." className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-64" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Add PlusCircleIcon here to be self-contained within Header's scope for now.
const PlusCircleIcon: React.FC<{className: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
    </svg>
);
