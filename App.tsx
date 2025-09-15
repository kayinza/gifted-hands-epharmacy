import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { Page } from './types';

const PageRenderer: React.FC = () => {
    const context = useContext(AppContext);
    
    if (!context) {
        return <div>Loading...</div>;
    }

    switch (context.currentPage) {
        case Page.Home:
            return <HomePage />;
        case Page.Products:
            return <ProductsPage />;
        case Page.ProductDetail:
            return <ProductDetailPage />;
        case Page.Cart:
            return <CartPage />;
        case Page.Checkout:
            return <CheckoutPage />;
        case Page.Login:
            return <LoginPage />;
        case Page.Profile:
            return <ProfilePage />;
        default:
            return <HomePage />;
    }
};

const App: React.FC = () => {
  return (
    <AppProvider>
        <div className="flex flex-col min-h-screen font-sans">
            <Header />
            <main className="flex-grow">
                <PageRenderer />
            </main>
            <Footer />
        </div>
    </AppProvider>
  );
};

export default App;