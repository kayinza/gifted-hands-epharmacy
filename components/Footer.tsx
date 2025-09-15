import React from 'react';
import { PlusCircleIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <PlusCircleIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Gifted Hands</span>
            </div>
            <p className="text-gray-400">Your trusted online pharmacy in Kampala. Delivering health to your doorstep.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Medicines</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Consult a Pharmacist</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Track Order</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li>Kampala, Uganda</li>
              <li>+256 777 123 456</li>
              <li>support@giftedhands.ug</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Gifted Hands Pharmacy. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             {/* Social media icons would go here */}
          </div>
        </div>
      </div>
    </footer>
  );
};
