import { useState, useMemo } from 'react';
import { Product, ProductCategory } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Header } from './components/Header';
import { FilterCard } from './components/FilterCard';
import { ProductCard } from './components/ProductCard';
import { EmptyState } from './components/EmptyState';
import { AddProductModal } from './components/AddProductModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Filter products by combining search query (case-insensitive) and category match
  const filteredProducts = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = trimmedQuery === '' || product.name.toLowerCase().includes(trimmedQuery);
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleAddProduct = (newProd: { name: string; category: ProductCategory; price: number; imageUrl?: string }) => {
    const product: Product = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      ...newProd,
    };
    setProducts((prev) => [product, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with live count badge and +Add Product button */}
        <Header
          totalCount={filteredProducts.length}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Filters bar/card */}
        <FilterCard
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Catalog Inventory section */}
        <section id="catalog-inventory-section" aria-labelledby="inventory-heading" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 id="inventory-heading" className="text-lg font-semibold text-slate-900 tracking-tight">
              Catalog Inventory
            </h2>
          </div>

          {/* Product Grid or Empty State */}
          {filteredProducts.length === 0 ? (
            <EmptyState onResetFilters={handleResetFilters} />
          ) : (
            <div
              id="product-grid"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Product Modal Form */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
