import React, { useContext } from 'react';
import { Product, Page } from '../types';
import { AppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const context = useContext(AppContext);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    context?.addToCart(product);
  };

  const handleCardClick = () => {
    context?.navigateTo(Page.ProductDetail, { productId: product.id });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
    >
      <div className="relative pt-[100%] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.requiresPrescription && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">Rx ONLY</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-dark mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{product.category}</p>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary">UGX {product.price.toLocaleString()}</p>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white rounded-full p-2 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};