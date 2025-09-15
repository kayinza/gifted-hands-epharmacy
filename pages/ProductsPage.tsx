import React, { useState, useMemo, useContext } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { SearchIcon } from '../components/icons';
import { AppContext } from '../context/AppContext';

export const ProductsPage: React.FC = () => {
    const context = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');

    if (!context) return null;
    const { selectedCategory, setSelectedCategory } = context;

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="bg-light min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h1 className="text-4xl font-extrabold text-dark">Our Medicines</h1>
                    <p className="mt-2 text-gray-600">Find the health products you need. Search by name or filter by category.</p>
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                             <input
                                type="text"
                                placeholder="Search for medicine..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-100 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                             />
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                             </div>
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-gray-100 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="All">All Categories</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </header>

                <main>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h2 className="text-2xl font-semibold text-dark">No Products Found</h2>
                            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};