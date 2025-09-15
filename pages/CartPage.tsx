import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';
import { TrashIcon, ChevronLeftIcon } from '../components/icons';

export const CartPage: React.FC = () => {
    const context = useContext(AppContext);

    if (!context) return null;

    const { cart, removeFromCart, updateQuantity, getCartTotal, navigateTo } = context;

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-dark">Your Cart is Empty</h1>
                <p className="text-gray-600 mt-2">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => navigateTo(Page.Products)} className="mt-6 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition-transform hover:scale-105 shadow-lg">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="bg-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button onClick={() => navigateTo(Page.Products)} className="flex items-center text-gray-500 hover:text-dark mb-6">
                  <ChevronLeftIcon className="h-5 w-5 mr-2" />
                  Continue Shopping
                </button>
                <h1 className="text-3xl font-extrabold text-dark mb-8">Your Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 space-y-4">
                        {cart.map(item => (
                            <div key={item.product.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                                <div className="flex items-center gap-4">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div>
                                        <h2 className="font-semibold text-dark">{item.product.name}</h2>
                                        <p className="text-sm text-gray-500">UGX {item.product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1 text-gray-600">-</button>
                                        <span className="px-3">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1 text-gray-600">+</button>
                                    </div>
                                    <p className="font-semibold w-24 text-right">UGX {(item.product.price * item.quantity).toLocaleString()}</p>
                                    <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                            <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">UGX {getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Delivery</span>
                                    <span className="font-semibold">UGX 5,000</span>
                                </div>
                                <div className="border-t pt-4 mt-4 flex justify-between text-lg font-bold text-dark">
                                    <span>Total</span>
                                    <span>UGX {(getCartTotal() + 5000).toLocaleString()}</span>
                                </div>
                            </div>
                            <button onClick={() => navigateTo(Page.Checkout)} className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-transform hover:scale-105 shadow-lg">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
