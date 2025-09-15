import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MOCK_PRODUCTS } from '../constants';
import { Page } from '../types';
import { ChevronLeftIcon } from '../components/icons';

export const ProductDetailPage: React.FC = () => {
  const context = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);

  if (!context || context.selectedProductId === null) {
    return (
        <div className="container mx-auto p-8 text-center">
            <h2 className="text-2xl font-bold">Product not found.</h2>
            <button onClick={() => context?.navigateTo(Page.Products)} className="mt-4 text-primary">
                Back to Products
            </button>
        </div>
    );
  }

  const { selectedProductId, navigateTo, addToCart } = context;
  const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);

  if (!product) {
      return <div>Product not found.</div>;
  }
  
  const handleAddToCart = () => {
      addToCart(product, quantity);
      navigateTo(Page.Cart);
  };
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigateTo(Page.Products)} className="flex items-center text-gray-500 hover:text-dark mb-6">
          <ChevronLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-100 rounded-lg p-8 shadow-sm">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain rounded-lg" />
          </div>

          <div>
            <span className="text-sm font-semibold text-primary uppercase">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-dark mt-2 mb-4">{product.name}</h1>
            {product.requiresPrescription && (
                <div className="mb-4 inline-flex items-center bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                    Prescription Required
                </div>
            )}
            <p className="text-3xl font-bold text-primary mb-6">UGX {product.price.toLocaleString()}</p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={decrementQuantity} className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-md">-</button>
                <span className="px-6 py-2 text-lg">{quantity}</span>
                <button onClick={incrementQuantity} className="px-4 py-2 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-md">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-secondary transition-transform hover:scale-105 shadow-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
