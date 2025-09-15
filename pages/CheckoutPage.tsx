import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Page } from '../types';

export const CheckoutPage: React.FC = () => {
    const context = useContext(AppContext);
    const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Confirmation
    const [paymentMethod, setPaymentMethod] = useState('');

    if (!context) return null;
    const { getCartTotal, cart, navigateTo } = context;
    
    if(cart.length === 0 && step !== 3) {
        navigateTo(Page.Home);
        return null;
    }

    const total = getCartTotal() + 5000; // 5000 for delivery

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else if (step === 2 && paymentMethod) {
            console.log('Order placed!');
            // Here you would typically call an API to process the order
            setStep(3);
        }
    };

    return (
        <div className="bg-light min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-2xl">
                {step !== 3 ? (
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-extrabold text-dark mb-6">Checkout</h1>
                        
                        <div className="flex items-center mb-8">
                            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                                <div className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-primary bg-primary text-white">1</div>
                                <span className="ml-2 font-semibold">Delivery</span>
                            </div>
                            <div className={`flex-grow border-t-2 mx-4 ${step >= 2 ? 'border-primary' : 'border-gray-300'}`}></div>
                            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>2</div>
                                <span className="ml-2 font-semibold">Payment</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {step === 1 && (
                                <div className="space-y-4 animate-fade-in">
                                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input type="tel" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                                        <textarea rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                                    </div>
                                    <button type="submit" className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition">Continue to Payment</button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                                    <p className="text-lg">Total Amount: <span className="font-bold text-primary">UGX {total.toLocaleString()}</span></p>
                                    <div className="space-y-3">
                                        {['MTN Mobile Money', 'Airtel Money', 'PayPal', 'Cash on Delivery'].map(method => (
                                            <label key={method} className={`flex items-center p-4 border rounded-lg cursor-pointer ${paymentMethod === method ? 'border-primary ring-2 ring-primary' : 'border-gray-300'}`}>
                                                <input type="radio" name="paymentMethod" value={method} onChange={e => setPaymentMethod(e.target.value)} className="h-4 w-4 text-primary focus:ring-primary"/>
                                                <span className="ml-3 font-medium">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <button type="submit" disabled={!paymentMethod} className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition disabled:bg-gray-400">Place Order</button>
                                </div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
                        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
                            <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-dark">Thank You!</h1>
                        <p className="text-gray-600 mt-2">Your order has been placed successfully. You will receive a confirmation message shortly.</p>
                        <button onClick={() => navigateTo(Page.Home)} className="mt-8 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary transition">Back to Home</button>
                    </div>
                )}
            </div>
        </div>
    );
};
