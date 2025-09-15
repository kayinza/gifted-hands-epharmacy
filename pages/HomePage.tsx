import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { PrescriptionUploadModal } from '../components/PrescriptionUploadModal';
import { Page } from '../types';

export const HomePage: React.FC = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight">
              Reliable Healthcare, <span className="text-primary">Delivered Fast.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Your trusted online pharmacy in Kampala. Get genuine medicines and health products delivered to your doorstep within hours.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button onClick={() => context?.navigateTo(Page.Products)} className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition-transform hover:scale-105 shadow-lg">
                Shop Medicines
              </button>
              <button onClick={() => setIsModalOpen(true)} className="bg-gray-200 text-dark font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition-transform hover:scale-105">
                Upload Prescription
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img src="https://picsum.photos/seed/pharmacy/600/500" alt="Pharmacist" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(category => (
              <div 
                key={category} 
                onClick={() => context?.navigateTo(Page.Products, { category })}
                className="bg-white p-4 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-lg hover:text-primary transition-all duration-300"
              >
                <p className="font-semibold">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-dark mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => context?.navigateTo(Page.Products)} className="text-primary font-semibold border-2 border-primary py-2 px-6 rounded-full hover:bg-primary hover:text-white transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      <PrescriptionUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};